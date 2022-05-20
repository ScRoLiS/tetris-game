import { MenuScreen, Screen, TetrisScreen } from './screen';
import { Config } from './Config';


export default class Game {

  private screen: Screen
  private canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.configureCanvas(canvas)
    this.screen = new MenuScreen(this)
    this.render(this.context)

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
    this.screen.render(ctx)
  }

  setScreen(screen: Screen) {
    this.screen = screen
  }

  keyPressed(e: KeyboardEvent) {
    this.screen.keyPressed(e)
    this.screen.render(this.context)
  }

}
