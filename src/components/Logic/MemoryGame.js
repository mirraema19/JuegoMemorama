import React, { useState, useEffect } from 'react';
import Board from '../Board/Board';
import confetti from 'canvas-confetti';
import Timer from '../Timer';

import '../Logic/MemoryGameTeens.css';

import leftImage from '../../assents/img/Niño interrogacion.png';
import rightImage from '../../assents/img/Niño con foco.png';

import gon from '../../assents/img/DESTRUIR COSAS.png';
import killua from '../../assents/img/MORDER.png';
import hisoka from '../../assents/img/ABUSO.png';
import leorio from '../../assents/img/BROMAS HIRIENTES.png';
import netero from '../../assents/img/GOLPEAR.png';
import kurapika from '../../assents/img/CONTROL.png';
import wing from '../../assents/img/IGNORAR.png';
import merum from '../../assents/img/SEÑALAMIENTOS.png';
import lucilfer from '../../assents/img/VIOLENCIA FISICA.png';
import biscuit from '../../assents/img/ACOSO.png';

const newimages = [netero, gon, killua, hisoka, leorio, kurapika, wing, merum, lucilfer, biscuit];
const initialSize = 4;

const MemoryGame = ({ goBackToMenu }) => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [level, setLevel] = useState(1); // Add state for level
  const [imageCount, setImageCount] = useState(initialSize); // Track number of pairs

  useEffect(() => {
    initializeGame(imageCount);
  }, [imageCount]);

  useEffect(() => {
    if (timerEnded) {
      setGameEnded(true);
      setGameStarted(false);
      resetSelectedMemoBlock();
    }
  }, [timerEnded]);

  const initializeGame = (pairCount) => {
    const imageList = newimages.slice(0, pairCount);
    const shuffledImageList = shuffleArray([...imageList, ...imageList]);
    setShuffledMemoBlocks(
      shuffledImageList.map((image, i) => ({
        index: i,
        image,
        flipped: false,
      }))
    );
    resetSelectedMemoBlock();
    setTimeLeft(40); // Reset time left on new game
  };

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleMemoClick = (memoBlock) => {
    if (!gameStarted || animating || timerEnded || gameEnded || memoBlock.flipped) return;

    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);

    if (selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.image === memoBlock.image) {
      setSelectedMemoBlock(null);
      updateScore();
      if (shuffledMemoBlocksCopy.every((block) => block.flipped)) {
        confetti({
          particleCount: 200,
          startVelocity: 30,
          spread: 300,
          gravity: 1.5,
          origin: { y: 0 },
        });
        if (imageCount >= newimages.length) {
          // All images have been used
          setGameEnded(true);
          setGameStarted(false);
        } else {
          setLevel(level + 1); // Increment the level
          setImageCount(imageCount + 2); // Increase the number of pairs
          setTimeout(() => {
            initializeGame(imageCount + 2);
            addTime(level * 10); // Add time based on the level
          }, 500);
        }
      }
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 500);
    }
  };

  const updateScore = () => {
    const cards = imageCount * 2;
    setScore(prevScore => prevScore + cards);
  };

  const resetSelectedMemoBlock = () => {
    setSelectedMemoBlock(null);
  };

  const startNewGame = () => {
    setScore(0);
    setGameStarted(true);
    setTimerEnded(false);
    setGameEnded(false);
    setImageCount(initialSize); // Reset the number of pairs
    setLevel(1); // Reset the level
    initializeGame(initialSize);
  };

  const addTime = (seconds) => {
    setTimeLeft(prevTime => prevTime + seconds);
  };

  return (
    <div className='App'>
      <img src={leftImage} className='left-image' alt='Left' />
      <img src={rightImage} className='right-image' alt='Right' />
      <h1 className='h1'>Memorama</h1>
      <div className='cont'>
        <div className='buttons'>
          {!gameStarted && !gameEnded && (
            <button onClick={startNewGame} className='start-button' variant='text' color='default'>
              Comenzar
            </button>
          )}
          {gameStarted && !timerEnded && <Timer setTimerEnded={setTimerEnded} gameStarted={gameStarted} timeLeft={timeLeft} />}
          {gameStarted && <h2>Puntaje: {score}</h2>}
          {gameEnded && (
            <>
              <h2>¡El juego ha terminado!</h2>
              <h3>Puntaje final: {score}</h3>
              <button onClick={startNewGame} className='start-button' variant='text' color='default'>
                Jugar de nuevo
              </button>
            </>
          )}
        </div>
      </div>
      <Board className='bor' memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick} />
      <button onClick={goBackToMenu} className='back-button'>Regresar al Menú</button>
    </div>
  );
};

export default MemoryGame;
