// App.js
import React, { useState } from 'react';
import MemoryIntro from './components/MemoryIntro';
import MemoryGame from './components/Logic/MemoryGame';
import MemoryGameTeens from './components/Logic/MemoryGameTeens';
import './App.css';
import introImage from './assents/img/logo_fiscalia.png';
import sideImage from './assents/img/Up logos.png'; // Nueva imagen a agregar

const App = () => {
  const [showGame, setShowGame] = useState(false);
  const [showTeensGame, setShowTeensGame] = useState(false);

  const startGame = () => {
    setShowGame(true);
  };

  const startTeensGame = () => {
    setShowTeensGame(true);
  };

  const goBackToMenu = () => {
    setShowGame(false);
    setShowTeensGame(false);
  };

  return (
    <div className='App'>
      {!showGame && !showTeensGame ? (
        <div className='intro-container'>
          <div className='images-container'>
            <img src={introImage} alt='Intro' className='intro-image' />
            <img src={sideImage} alt='Side' className='side-image' /> {/* Imagen añadida */}
          </div>
          <MemoryIntro startGame={startGame} startTeensGame={startTeensGame} />
        </div>
      ) : showTeensGame ? (
        <MemoryGameTeens goBackToMenu={goBackToMenu} />
      ) : (
        <MemoryGame goBackToMenu={goBackToMenu} />
      )}
    </div>
  );
};

export default App;
