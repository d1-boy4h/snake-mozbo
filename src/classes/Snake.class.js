export class Snake {
  static vectors = {
    up: ([x, y]) => [x, --y],
    down: ([x, y]) => [x, ++y],
    left: ([x, y]) => [--x, y],
    right: ([x, y]) => [++x, y],
  };

  constructor(props) {
    const { size, spawn } = props;

    this.size = size;
    [this.spawnX, this.spawnY] = spawn;

    this.vector = null;
    this.body = [];
  }

  spawn() {
    this.vector = Snake.vectors.right;

    for (let s = 0; s < this.size; s++)
      this.body.push([this.spawnX - s, this.spawnY]);
  }

  step() {
    this.body.pop();
    this.body.unshift(this.vector(this.body[0]));
  }

  stepOnFruit() {
    this.body.unshift(this.vector(this.body[0]));
  }
}
