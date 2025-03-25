import { Game } from './classes/Game.class.js';

const game = new Game({
  width: 20,
  height: 20,
  speed: 130,
  snakeSize: 3
});

game.start();
