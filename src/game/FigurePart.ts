import { Config } from './Config';

export class FigurePart {

  color: string

  constructor(color: string) {
    this.color = color
  }

  render(x: number, y: number, ctx: CanvasRenderingContext2D) {
    const lineWidth = 3.5
    const leftX = x * Config.partSize
    const rightX = leftX + Config.partSize
    const topY = y * Config.partSize
    const bottomY = topY + Config.partSize
    const lineOffset = lineWidth / 2

    ctx.fillStyle = this.color
    ctx.fillRect(x * Config.partSize, y * Config.partSize, Config.partSize, Config.partSize)

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = '#00000022'
    this.drawLine(rightX - lineOffset, topY, rightX - lineOffset, bottomY, ctx)
    this.drawLine(leftX, bottomY - lineOffset, rightX, bottomY - lineOffset, ctx)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = '#ffffffbb'
    this.drawLine(leftX, topY + lineOffset, rightX, topY + lineOffset, ctx)
    this.drawLine(leftX + lineOffset, topY, leftX + lineOffset, bottomY, ctx)
    ctx.stroke()
  }

  drawLine(x: number, y: number, toX: number, toY: number, ctx: CanvasRenderingContext2D) {
    ctx.moveTo(x, y)
    ctx.lineTo(toX, toY)
  }
}