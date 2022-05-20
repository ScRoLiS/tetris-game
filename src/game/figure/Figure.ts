import { Utils } from '../Utils'
import { Config } from "../Config"
import FigurePart from './FigurePart'

export default class Figure {

  private x: number
  private y: number

  private template: (number | FigurePart)[][]

  constructor(color: string, template: number[][]) {
    this.template = Utils.templateToFigure(color, template)
    this.x = Config.width / Config.partSize / 2 - Math.round(template[0].length / 2)
    this.y = 0
  }

  render(ctx: CanvasRenderingContext2D) {
    this.template.forEach((row, i) => {
      row.map((item, j) => {
        if (typeof item !== 'number')
          item.render(j + this.x, i + this.y, ctx)
      })
    })
  }

  turn() {
    this.template = Utils.turnFigure(this.template)
  }

  turnBackward() {
    this.template = Utils.turnFigureBackward(this.template)
  }

  moveDown() {
    this.y++
  }

  moveLeft() {
    this.x--
  }

  moveRight() {
    this.x++
  }

  getX(): number {
    return this.x
  }

  getY(): number {
    return this.y
  }

  setX(x: number) {
    this.x = x
  }

  setY(y: number) {
    this.y = y
  }

  getTemplate(): (number | FigurePart)[][] {
    return this.template
  }
}
