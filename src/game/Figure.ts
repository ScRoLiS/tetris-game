import { Utils } from './Utils';
import { FigurePart } from './FigurePart';
import { Config } from "./Config"

export class Figure {

  private x: number 
  private y: number
  private prevX: number
  private prevY: number
  private color: string

  private template: (number | FigurePart)[][]

  constructor(color: string, template: number[][]) {
    this.color = color
    this.template = Utils.templateToFigure(color, template)
    this.x = Config.width / Config.partSize / 2 - Math.round(template[0].length / 2)
    this.y = 0
    this.prevX = this.x
    this.prevY = this.y
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
