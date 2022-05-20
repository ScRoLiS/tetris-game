import { FigureType, FigurePart } from './figure';

export class Utils {

  static getRandomFigure(): number[][] {
    return FigureType[Utils.getRandom(0, FigureType.length - 1)]
  }

  static getRandom(min: number, max: number): number {
    return Math.round(min + Math.random() * max)
  }

  static getRandomColor(): string {
    const colors = [
      '#e53935', '#8e24aa', '#3949ab',
      '#039be5', '#43a047', '#c0ca33',
      '#ffb300', '#f4511e', '#546e7a',
      '#9CCC65', '#1565C0', '#F06292',
      '#B388FF', '#82B1FF', '#FF6D00'
    ]
    return colors[Utils.getRandom(0, colors.length - 1)]
  }

  static templateToFigure(color: string, template: number[][]): (number | FigurePart)[][] {
    const figure = template.map((row) => {
      return row.map((item) => {
        if (item !== 0) {
          return new FigurePart(color)
        }
        return item
      })
    })

    return figure
  }

  static turnFigure(matrix: (number | FigurePart)[][]) {
    const mtrx = [...matrix]

    let newMatrix = new Array(mtrx[0].length).fill(0).map((item) => {
      return new Array(mtrx.length).fill(0)
    })

    mtrx.forEach((row, i) => {
      row.forEach((item, j) => {
        newMatrix[j][newMatrix[0].length - i - 1] = item
      })
    })

    return newMatrix
  }

  static turnFigureBackward(matrix: (number | FigurePart)[][]) {
    const mtrx = [...matrix]

    let newMatrix = new Array(mtrx[0].length).fill(0).map((item) => {
      return new Array(mtrx.length).fill(0)
    })

    mtrx.forEach((row, i) => {
      row.forEach((item, j) => {
        newMatrix[newMatrix.length - j - 1][i] = item
      })
    })

    return newMatrix
  }
}
