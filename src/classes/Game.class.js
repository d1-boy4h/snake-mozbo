import { Snake } from './Snake.class.js';
import { Fruit } from './Fruit.class.js';

export class Game {
  static void = '';
  static head = 'h';
  static body = 'b';
  static fruit = 'f';
  static border = 'x';

  static cellColors = {
    [Game.void]: 'LightGreen',
    [Game.head]: 'BlueViolet',
    [Game.body]: 'MediumOrchid',
    [Game.border]: 'DarkSlateGrey',
    [Game.fruit]: 'IndianRed'
  };

  constructor(props) {
    const { width, height, speed, snakeSize } = props;

    this.width = width;
    this.height = height;
    this.speed = speed;

    this.isRun = true;

    this.map = this.createMap(this.width, this.height);

    this.snake = new Snake({
      size: snakeSize,
      spawn: [
        (this.width / 2),
        (this.height / 2)
      ]
    });

    this.fruit = new Fruit({
      widthLimit: this.width - 1,
      heightLimit: this.height - 1
    });
  }

  createMap(width, height) {
    const map = [];

    for (let h = 1; h <= height; h++) {
      map.push([]);
      for (let w = 1; w <= width; w++) {
        map[h - 1].push(
          h === 1 || h === height || w === 1 || w === width ?
            Game.border : Game.void
        );
      }
    }

    return map;
  }

  buildMap(map) {
    const app = document.querySelector('#app');

    for (let h = 1; h <= map.length; h++) {
      const line = document.createElement('div');
      line.id = 'line-' + h;
      line.className = 'line';

      for (let w = 1; w <= map[0].length; w++) {
        const cell = document.createElement('div');

        cell.id = `cell-${h}-${w}`;
        cell.className = 'cell';
        cell.style.backgroundColor = Game.cellColors[map[h - 1][w - 1]];

        line.appendChild(cell);
      }

      app.appendChild(line);
    }
  }

  updateCell(x, y) {
    const cell = document.querySelector(`#cell-${y}-${x}`);
    cell.style.backgroundColor = Game.cellColors[this.map[y - 1][x - 1]];
  }

  setCell(xValue, yValue, symbol = Game.void) {
    const x = xValue.toFixed();
    const y = yValue.toFixed();

    this.map[y - 1][x - 1] = symbol;
    this.updateCell(x, y);
  }

  render(cordList, symbol) {
    cordList.forEach(cords => {
      this.setCell(cords[0], cords[1], symbol);
    });
  }

  handleStep() {
    const nextCords = this.snake.vector(this.snake.body[0]);
    const nextMapCords = this.map[nextCords[1] - 1][nextCords[0] - 1];

    if (nextMapCords === Game.void || nextMapCords === Game.fruit) {
      this.render(this.snake.body);

      if (nextMapCords === Game.fruit) {
        this.snake.stepOnFruit();
        this.handleSpawnFruit();
      }
      else this.snake.step();

      this.render(this.snake.body, Game.body);
      this.render([this.snake.body[0]], Game.head);
    }
    else this.stop();
  }

  handleKeyPress = event => {
    switch(event.key) {
      case 'w':
      case 'W':
      case 'ц':
      case 'Ц':
        if (this.snake.vector !== Snake.vectors.down)
          this.snake.vector = Snake.vectors.up;
        break;
      case 'd':
      case 'D':
      case 'в':
      case 'В':
        if (this.snake.vector !== Snake.vectors.left)
          this.snake.vector = Snake.vectors.right;
        break;
      case 's':
      case 'S':
      case 'ы':
      case 'Ы':
        if (this.snake.vector !== Snake.vectors.up)
          this.snake.vector = Snake.vectors.down;
        break;
      case 'a':
      case 'A':
      case 'ф':
      case 'Ф':
        if (this.snake.vector !== Snake.vectors.right)
          this.snake.vector = Snake.vectors.left;
        break;
    }
  }

  handleSpawnFruit() {
    for (let k = 0; k < this.width * this.height; k++) {
      this.fruit.spawn();
      if (this.map[this.fruit.cords[1] - 1][this.fruit.cords[0] - 1] === Game.void)
        break;
    }

    this.render([this.fruit.cords], Game.fruit);
  }

  start() {
    // Создание поля, спавн змеи и фрукта
    this.buildMap(this.map);
    this.snake.spawn();
    this.handleSpawnFruit();

    // Отслеживание нажатия клавиш
    document.addEventListener('keydown', this.handleKeyPress);

    // Главный цикл игры
    const handleStep = this.handleStep;
    const currentThis = this;

    const speed = this.speed;
    let timer = setTimeout(function func() {
      handleStep.call(currentThis);
      if (!currentThis.isRun) return;
      timer = setTimeout(func, speed);
    }, speed);
  }

  stop() {
    this.isRun = false;

    const endTitle = document.createElement('span');
    endTitle.innerText = 'Конец игры';
    endTitle.className = 'end-title';
    document.body.appendChild(endTitle);
  }
}
