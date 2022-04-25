import React from 'react';
import { createStage } from '../../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styledTetris';
// components
import Stage from '../Stage';
import Display from '../Display';
import StartButton from '../StartButton';

const Tetris = () => {


  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text='Score' />
            <Display text='Rules' />
            <Display text='Level' />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris;