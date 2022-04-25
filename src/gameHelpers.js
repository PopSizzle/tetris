export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {

  return Array.from(Array(STAGE_HEIGHT), () => 
  new Array(STAGE_WIDTH).fill([0,'clear']));

}