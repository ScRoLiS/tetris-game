import { Field } from './../Field';
import { KeyType } from './../KeyType';
import { Config } from '../Config';
import Screen from "./Screen";
import { FigurePart } from 'game/figure';

export default class MenuScreen extends Screen {

  menu = ['Start', 'Options', 'About', 'Github']
  index = 0
  field: Field

  fieldTemplate: (number | FigurePart)[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1,],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1,],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1,],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1,],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1,],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1,],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1,],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
  ]

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.field = new Field(this.fieldTemplate)

    this.render(this.context)
  }

  render(ctx: CanvasRenderingContext2D) {
    const fontSize = Config.height * 5 / 100

    ctx.fillStyle = '#3498DB'
    ctx.fillRect(0, 0, Config.width, Config.height)


    this.field.render(ctx)

    ctx.fillStyle = '#fff'
    ctx.font = `${fontSize}px sans-serif`
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'

    this.menu.forEach((item, i) => {
      if (i === this.index) return
      ctx.fillText(item, Config.width / 2, Config.height / 2 - this.menu.length / 2 * fontSize + i * fontSize)
    })

    ctx.fillStyle = '#34495E'
    ctx.fillText(this.menu[this.index], Config.width / 2, Config.height / 2 - this.menu.length / 2 * fontSize + this.index * fontSize)
  }

  select() {
    switch (this.menu[this.index]) {
      case 'Start':
        console.log('START');
        break;
      case 'Options':
        console.log('OPTIONS');
        break;
      case 'About':
        console.log('ABOUT');
        break;
      case 'Github':
        window.open('https://github.com/scrolis/tetris-game', '_blank');
        break;
    }
  }

  keyPressed(e: KeyboardEvent) {
    switch (e.key) {
      case KeyType.UP:
        this.index--
        if (this.index < 0)
          this.index = this.menu.length - 1
        break;
      case KeyType.DOWN:
        this.index++
        if (this.index > this.menu.length - 1)
          this.index = 0
        break;
      case KeyType.ENTER:
        this.select()
        break;
    }
    this.render(this.context)
  }

}
