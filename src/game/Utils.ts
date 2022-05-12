import { FigurePart } from './FigurePart';

export class Utils {

  static getRandomColor(): string {
    const colors = ['#e53935', '#8e24aa', '#3949ab', '#039be5', '#43a047', '#c0ca33', '#ffb300', '#f4511e', '#546e7a']
    const random = Math.round(Math.random() * (colors.length - 1))
    return colors[random]
  }

  static templateToFigure(color: string, template: number[][]): (number | FigurePart)[][] {
    const figure = template.map((row) => {
      return row.map((item) => {
        if (item !== 0) {
          return new FigurePart(color)
        }
        else {
          return item
        }
      })
    })

    return figure
  }

  static transposeMatrix(matrix: (number | FigurePart)[][]) {
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
}
