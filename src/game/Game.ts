import { KeyType } from './KeyType';
import { FigureType } from './FigureType';
import { Utils } from './Utils';
import { Figure } from './Figure';
import { Config } from './Config';
import { Field } from './Field';

export class Game {

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private figure: Figure
  private field: Field

  constructor(canvas: HTMLCanvasElement) {
    this.configureCanvas(canvas)
    this.field = new Field()
    this.figure = new Figure(Utils.getRandomColor(), FigureType.T)


    window.addEventListener('resize', () => {
      this.configureCanvas(canvas)
      this.render(this.context)
    })
    window.addEventListener('keydown', this.keyPressed.bind(this))
  }

  configureCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    Config.setConfig({
      width: window.innerHeight / 20 * 10,
      height: window.innerHeight
    })

    this.canvas.width = Config.width
    this.canvas.height = Config.height
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffafaf'
    ctx.fillRect(0, 0, Config.width, Config.height)

    this.field.render(ctx)
    this.figure.render(ctx)
    // this.renderGrid(ctx)
  }

  renderGrid(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 0.5
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
        if (this.figure.getX() > 0)
          this.figure.moveLeft()
        break;
      case KeyType.RIGHT:
        if (this.figure.getX() + this.figure.getTemplate()[0].length - 1 < this.field.getField()[0].length - 1)
          this.figure.moveRight()
        break;
      case KeyType.UP:
        this.figure.turn()
        break;
      case KeyType.DOWN:
        this.moveDown()
        break;
    }
  }

  moveDown() {
    if (this.figure.getY() + this.figure.getTemplate().length > this.field.getField().length - 1) {
      this.field.append(this.figure)
      this.figure = new Figure(Utils.getRandomColor(), FigureType.T)
    }

    this.figure.moveDown()
  }

  gamePlay() {
    this.moveDown()
  }

  start() {
    this.render(this.context)

    setInterval(this.gamePlay.bind(this), 1000)
    setInterval(this.render.bind(this, this.context), 0)
  }
}
