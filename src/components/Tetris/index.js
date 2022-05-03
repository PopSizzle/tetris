import React, { useState } from 'react';

import { createStage, checkCollision } from '../../gameHelpers';

// styled Components
import { StyledTetrisWrapper, StyledTetris } from './styledTetris';

// components
import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

// Custom Hooks
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';


const Tetris = () => {

  const[dropTime, setDropTime] = useState(null);
  const[gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');
  
  const lateralMove = (direction) =>{
      if(!checkCollision(player, stage, { x: direction, y: 0})){
      updatePlayerPos({ x: direction, y: 0});
      }
  }

  const startGame = () =>{
    // reset to starting position
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  const drop = () =>{
    if(!checkCollision(player, stage, { x: 0, y: 1})){
      updatePlayerPos({ x: 0, y: 1, collided: false})
    } else {
      // Check if game is over
      if(player.pos.y < 1){
        console.log('GAME OVER');
        setGameOver(true);
        setDropTime(null);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true});
    }
    
  }

  const dropPlayer = () =>{
      drop();
  }

  const move = ({ keyCode }) =>{
      console.log(keyCode);
      if(!gameOver){
        if(keyCode === 37) {
          lateralMove(-1);
        } else if(keyCode === 39){
          lateralMove(1);
        } else if(keyCode === 40){
          dropPlayer();
        } else if(keyCode === 38) {
          playerRotate(stage, 1);
        }
      }

  }


  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over"/>
          ) : (
          <div>
            <Display text='Score' />
            <Display text='Rules' />
            <Display text='Level' />
          </div>
          )}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris;