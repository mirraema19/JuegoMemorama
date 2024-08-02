import React from 'react';
import bottomImage from '../assents/img/Memorama8.png'; 
import leftImage from '../assents/img/Memorama4.png'; 
import rightImage from '../assents/img/Memorama2.png'; 

const MemoryIntro = ({ startGame, startTeensGame }) => { 
  const handleButtonClick = (isTeens) => {
    if (isTeens) {
      startTeensGame(); 
    } else {
      startGame(); 
    }
  };

  return (
    <div className="memory-game-container">
      <div className="images-container">
        <div className="image-left">
          <img src={leftImage} alt="Imagen Izquierda" className="left-image" /> 
        </div>
        <div className="image-right">
          <img src={rightImage} alt="Imagen Derecha" className="right-image" /> 
        </div>
      </div>
      <h1 className="title">JUEGO DE MEMORAMAS</h1>
      <div className="card special-card">
        <p className="message">
          ¡Juega, aprende y diviértete con tu memoria! ¡Descubre y combina para ganar!
        </p>
      </div>
      <div className="buttons-container">
        <button className="age-button" onClick={() => handleButtonClick(false)}>3 a 10 años</button> {/* Manejar el evento onClick para niños */}
        <button className="age-button" onClick={() => handleButtonClick(true)}>11 a 17 años</button> {/* Manejar el evento onClick para adolescentes */}
      </div>
      <div className="image-container">
        <img src={bottomImage} alt="Imagen" className="bottom-image" /> 
      </div>
    </div>
  );
};

export default MemoryIntro;
