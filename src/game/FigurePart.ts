import { Config } from './Config';

export class FigurePart {

  color: string

  constructor(color: string) {
    this.color = color
  }

  render(x: number, y: number, ctx: CanvasRenderingContext2D) {
    const lineWidth = 2.5

    ctx.fillStyle = this.color
    ctx.fillRect(x * Config.partSize, y * Config.partSize, Config.partSize, Config.partSize)

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = '#00000022'
    ctx.moveTo(x * Config.partSize + Config.partSize, -lineWidth / 2 + y * Config.partSize + Config.partSize)
    ctx.lineTo(x * Config.partSize, -lineWidth / 2 + y * Config.partSize + Config.partSize)
    ctx.moveTo(-lineWidth / 2 + x * Config.partSize + Config.partSize, + y * Config.partSize + Config.partSize)
    ctx.lineTo(-lineWidth / 2 + x * Config.partSize + Config.partSize, + y * Config.partSize)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = '#ffffffbb'
    ctx.moveTo(lineWidth / 2 + x * Config.partSize, lineWidth / 2 + y * Config.partSize)
    ctx.lineTo(x * Config.partSize + Config.partSize, lineWidth / 2 + y * Config.partSize)
    ctx.moveTo(lineWidth / 2 + x * Config.partSize, y * Config.partSize)
    ctx.lineTo(lineWidth / 2 + x * Config.partSize, y * Config.partSize + Config.partSize)
    ctx.stroke()
  }
}