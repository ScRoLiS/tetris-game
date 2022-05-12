import { Utils } from './Utils';
import { FigurePart } from './FigurePart';
import { Config } from "./Config"

export class Figure {

  private x: number
  private y: number
  private color: string

  private template: (number | FigurePart)[][]

  constructor(color: string, template: number[][]) {
    this.color = color
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
    this.template = Utils.transposeMatrix(this.template)
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
}
