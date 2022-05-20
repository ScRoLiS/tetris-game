import Game from '../Game';
import Screen from './Screen'
import { Utils } from '../Utils';
import { Field } from '../Field';
import { Figure, FigureType } from '../figure';
import { Config } from '../Config';
import { KeyType } from '../KeyType';

export default class TetrisScreen extends Screen {

  private figure: Figure
  private field: Field
  private gameTimer: NodeJS.Timer

  constructor(game: Game) {
    super(game)
    this.field = new Field()
    this.figure = new Figure(Utils.getRandomColor(), Utils.getRandomFigure())
    // this.figure = new Figure(Utils.getRandomColor(), FigureType[7])
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffafaf'
    ctx.fillRect(0, 0, Config.width, Config.height)

    this.figure.render(ctx)
    this.field.render(ctx)
    this.renderGrid(ctx)
  }

  renderGrid(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 0.2
    for (let i = 0; i <= Config.width / Config.partSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * Config.partSize, 0);
      ctx.lineTo(i * Config.partSize, Config.height);
      ctx.stroke()
    }
    for (let i = 0; i <= Config.height / Config.partSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * Config.partSize);
      ctx.lineTo(Config.width, i * Config.partSize);
      ctx.stroke()
    }
  }

  keyPressed(e: KeyboardEvent) {
    switch (e.key) {
      case KeyType.LEFT:
        this.figure.moveLeft()
        if (this.figure.getX() < 0 || this.field.checkFieldPartCollision(this.figure))
          this.figure.setX(this.figure.getX() + 1)
        break;
      case KeyType.RIGHT:
        this.figure.moveRight()
        if ((this.figure.getX() + this.figure.getTemplate()[0].length - 1 > this.field.getField()[0].length - 1) || this.field.checkFieldPartCollision(this.figure))
          this.figure.setX(this.figure.getX() - 1)
        break;
      case KeyType.UP:
        this.turnFigure()
        break;
      case KeyType.DOWN:
        this.moveDown()
        break;
    }
  }

  moveDown() {
    this.figure.moveDown()

    if (this.field.checkFieldBottomCollision(this.figure)) {
      this.figure.setY(this.figure.getY() - 1)
      this.field.append(this.figure)
      const lines = this.field.checkLinesFilled(this.figure)
      if (lines.length && !this.field.cubes.length)
        this.field.renderRemove(lines, this)
      this.figure = new Figure(Utils.getRandomColor(), Utils.getRandomFigure())
      // this.figure = new Figure(Utils.getRandomColor(), FigureType[7])

      if (this.field.checkFieldBottomCollision(this.figure)) {
        this.stop()
      }
    }
    this.render(this.game.context)
  }

  turnFigure() {
    this.figure.turn()

    if (this.field.checkFieldPartCollision(this.figure))
      this.figure.turnBackward()

  }

  gamePlay() {
    this.moveDown()
  }

  stop() {
    console.log('STOP');
    clearInterval(this.gameTimer)
  }

  pause() {
    clearInterval(this.gameTimer)
  }

  start() {
    this.gameTimer = setInterval(this.gamePlay.bind(this), 1000)
    // setInterval(this.render.bind(this, this.context), 0)
  }
}
