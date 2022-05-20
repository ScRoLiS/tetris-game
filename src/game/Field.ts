import { Utils } from './Utils';
import { Figure, FigurePart } from './figure';

export class Field {

  field: (number | FigurePart)[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
  ]

  constructor(field?: (number | FigurePart)[][]) {
    if (field) {
      this.field = field.map((row) => {
        return row.map((item) => {
          if (item === 1)
            return new FigurePart(Utils.getRandomColor())
          else return item
        })
      })
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.field.forEach((row, i) => {
      row.forEach((item, j) => {
        if (typeof item !== 'number') {
          item.render(j, i, ctx)
        }
      })
    })
  }

  append(figure: Figure) {
    figure.getTemplate().forEach((row, i) => {
      row.forEach((item, j) => {
        if (typeof item !== 'number') {
          this.field[figure.getY() + i][figure.getX() + j] = item
        }
      })
    })
  }

  checkLinesFilled(figure: Figure) {
    const temp = figure.getTemplate()
    let isRemove = false

    for (let y = 0; y < temp.length; y++) {
      const fieldRow = this.field[y + figure.getY()]
      for (let x = 0; x < fieldRow.length; x++) {
        const item = fieldRow[x]
        if (typeof item === 'number') {
          isRemove = false
          break
        }
        isRemove = true
      }
      if (isRemove)
        this.removeLines(figure.getY() + y)

      isRemove = false
    }
  }

  removeLines(line: number) {
    this.field = this.field.filter((item, index) => {
      return index !== line
    })

    while (this.field.length < 20) {
      this.field.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
  }

  checkFieldPartCollision(figure: Figure): boolean {
    const template = figure.getTemplate()

    for (let y = 0; y < template.length; y++) {
      const elementY = template[y]
      for (let x = 0; x < elementY.length; x++) {
        const elementX = elementY[x]
        if ((typeof elementX !== 'number') && (typeof this.field[figure.getY() + y][figure.getX() + x] !== 'number')) {
          return true
        }
      }
    }

    return false
  }

  checkFieldBottomCollision(figure: Figure): boolean {
    const template = figure.getTemplate()

    if (figure.getY() + template.length >= this.field.length + 1) {
      return true
    }

    if (this.checkFieldPartCollision(figure)) {
      return true
    }

    return false
  }

  getField(): (number | FigurePart)[][] {
    return this.field
  }
}
