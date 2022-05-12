import { KeyType } from './KeyType';
import { FigureType } from './FigureType';
import { Utils } from './Utils';
import { Figure } from './Figure';
import { Config } from './Config';

export class Game {

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private figure: Figure

  constructor(canvas: HTMLCanvasElement) {
    this.configureCanvas(canvas)
    window.addEventListener('resize', this.configureCanvas.bind(this, canvas))

    this.figure = new Figure(Utils.getRandomColor(), FigureType.T)

    window.addEventListener('keydown', this.keyPressed.bind(this))

    // setInterval(() => {
    //   this.render(this.context)
    //   this.figure.moveDown()
    // }, 1000)
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

    // this.render(this.context)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffafaf'
    ctx.fillRect(0, 0, Config.width, Config.height)

    this.figure.render(ctx)
    this.renderGrid(ctx)
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
        this.figure.moveLeft()
        break;
      case KeyType.RIGHT:
        this.figure.moveRight()
        break;
      case KeyType.UP:
        this.figure.turn()
        break;
      case KeyType.DOWN:
        this.figure.moveDown()
        break;
    }
    this.render(this.context)
  }

  start() {
    this.render(this.context)
  }
}
