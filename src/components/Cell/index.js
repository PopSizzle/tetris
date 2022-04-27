import React from 'react';
import { StyledCell } from './styledCell';
import { TETROMINOS } from '../../tetrominos';

const Cell = ({ type }) =>{
  return(
  <StyledCell type={'L'} color={TETROMINOS['L'].color}/>
  )
}

export default Cell;