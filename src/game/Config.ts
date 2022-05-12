export class Config {
  static width: number
  static height: number
  static partSize: number

  static setConfig({ width, height }) {
    Config.width = width
    Config.height = height
    Config.partSize = height / 20
  }
}
