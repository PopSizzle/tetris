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
import { useInterval } from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';


const Tetris = () => {

  const[dropTime, setDropTime] = useState(null);
  const[gameOver, setGameOver] = useState(false);


  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');
  
  const lateralMove = (direction) =>{
      if(!checkCollision(player, stage, { x: direction, y: 0})){
      updatePlayerPos({ x: direction, y: 0});
      }
  }

  const startGame = () =>{
    // reset to starting position
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setRows(0);
  }

  const drop = () =>{
    // Increase level every 10 rows cleared
    if(rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Increase speed according to level
      setDropTime(800 / level + 200);
    }

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

  const keyUp =({ keyCode }) =>{
    if(!gameOver) {
      if(keyCode === 40){
        setDropTime(800 / (level+1) + 200);
        console.log('interval on');
      }
    }
  }

  const dropPlayer = () =>{
    console.log('interval off');
    setDropTime(null);  
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

  useInterval(() => {
    drop();
  }, dropTime)

  return (
    <StyledTetrisWrapper role='button' tabIndex='0' onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over"/>
          ) : (
          <div>
            <Display text= {`Score: ${score}`} />
            <Display text= {`Rows: ${rows}`} />
            <Display text= {`Level: ${level}`} />
          </div>
          )}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris;