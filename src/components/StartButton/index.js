import React from 'react';
import { StyledStartButton } from './styledStart';

const StartButton = ({ callback }) =>{
  return(
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
  )
}

export default StartButton;