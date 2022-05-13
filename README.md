# React Tetris

This Tetris app is an adaptation of the 1980s classic arcade game.
The player controls the pieces using the arrow keys on the keyboard to move left and right. The up arrow rotates the tetromino shape and the down arrow accelerates the descent of the shape. This version follows the original formula to calculate scoring and advances the level with every ten rows that are cleared. Every time the level advances, the default speed at which the pieces drop accelerates slightly.

This tetris app utilizes the re-rendering of React to manage the state of the game and the location of the tetromino shapes. It utilizes the useState feature of react to track both the location of the moving shape and the composition of the completed board. It also utilizes several custom hooks to control various aspects of the game.

# Table of Contents

  i. Technologies used
  ii. Specific code samples
  iii. Installation
  iv. Acknowledgements
  v. Author

# Technologies used

  ReactJS - model and render the information displayed on the browser

  Git - version control system to track changes made to code

  Github - online hosting of the repository for general viewing

  Heroku - to host the deployed application  

  JavaScript - a dynamic object-oriented programming language 

# Code Samples

  One of the more difficult portions of the application was when a roation made by the player would result in a collision. The solution was attempting to move the rotated piece left and right to see if it could fit there. If no space as found within the width of the piece, the rotation was canceled.
  ```
     const playerRotate = (stage, dir) => {
    // deep copy of the player object
    const deepPlayerCopy = JSON.parse(JSON.stringify(player));
    // rotate the tetormino
    deepPlayerCopy.tetromino = rotate(deepPlayerCopy.tetromino, dir);

    // Check for collisions or leaving stage while rotating
    const pos = deepPlayerCopy.pos.x;
    let offset = 1;
    // If there is a collision, offset the rotated piece and check again
    while(checkCollision(deepPlayerCopy, stage, { x: 0, y: 0})){
      
      deepPlayerCopy.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      // If the offset has surpassed the grid of the shape, undo the rotation
      if(offset > deepPlayerCopy.tetromino[0].length){
        rotate(deepPlayerCopy.tetromino, -dir);
        deepPlayerCopy.pos.x = pos;
        return;
      }
    }
    // Set the deep copy as the new player object
    setPlayer(deepPlayerCopy);
  }
  ```

# Installation and use

  In order to simply play the Tetris game, a user can simply click on the Heroku link.

  If they would like to clone the repository to your machine, follow these steps:

  1. Fork the repository
  2. Clone your repository
  3. Open a terminal and cd into your cloned repo
  4. "cd app"
  5. "npm install" // install the node modules
  6. "cd tetris"
  7. "npm install" // ensure all node modules are installed for React
  8. "npm run start" // starts your server, creates your database tables, starts react and opens a browser.

# Acknowledgements

  HUGE acknowledgement and thank you to freecodecamp.org and youtube user weibenfalk. Their tutorial helped me immensely in understanding how to use hooks with Tetris specifically. I essentially followed their tutorial and then added my own style and some expanded features. I could not have done it without them.

  View their tutorial at https://www.youtube.com/watch?v=ZGOaCxX8HIU

  Also a thank you to Dan Abramaov, who provided the setInterval custom hook and graciously gave permission for others to use it in their projects.
  
  View his blog post on the subject here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

# Author

Feel free to contact me on Github!

<img src="https://avatars1.githubusercontent.com/u/60407759?s=80" alt = "Poppe's avatar" style = "border-radius: 15px;"/>   [GitHub](https://github.com/PopSizzle) Sam Poppe   



