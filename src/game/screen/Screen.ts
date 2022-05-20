import { Config } from "../Config"

export default abstract class Screen {

  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.configureCanvas(canvas)

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

  abstract render(ctx: CanvasRenderingContext2D): void

  abstract keyPressed(e: KeyboardEvent): void

}