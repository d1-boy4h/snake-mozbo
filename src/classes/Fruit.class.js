export class Fruit {
  constructor(props) {
    const { widthLimit, heightLimit } = props;

    this.mapWidth = widthLimit;
    this.mapHeight = heightLimit;

    this.cords = [];
  }

  getRandomNumber = limit =>
    Math.floor(Math.random() * limit) + 1;

  spawn() {
    this.cords = [
      this.getRandomNumber(this.mapWidth),
      this.getRandomNumber(this.mapHeight)
    ];
  }
}
