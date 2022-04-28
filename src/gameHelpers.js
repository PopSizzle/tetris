export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {

  return Array.from(Array(STAGE_HEIGHT), () => 
  new Array(STAGE_WIDTH).fill([0,'clear']));

}

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for(let y = 0; y < player.tetromino.length; y += 1) {
    for(let x = 0; x < player.tetromino[y].length; x += 1) {

      // check that we are on a shape
      if(player.tetromino[y][x] !== 0){
        // check that our move is within height boundaries
        if(!stage[y + player.pos.y + moveY] || 
        // check that shape is not leaving the width of box
        !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
        // check that the cell we're moving to is not set to clear
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'){
          return true;
        }
      }
    }
  }
}