import React from 'react';
import { StyledCell } from './styledCell';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({ type }) =>{
  return(
  <StyledCell type={type} color={TETROMINOS[type].color}>{console.log('rerender')}</StyledCell>
  )
}

export default React.memo(Cell);