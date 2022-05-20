import Game from '../Game';
import Screen from "./Screen";
import TetrisScreen from './TetrisScreen';
import { Field } from './../Field';
import { Config } from '../Config';
import { KeyType } from './../KeyType';
import { FigurePart } from 'game/figure';
import { Utils } from '../Utils';

export default class MenuScreen extends Screen {

  index = 0
  field: Field
  color: string
  menuColor: string
  menu = ['Start', 'Options', 'About', 'Github']

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

  constructor(game: Game) {
    super(game)
    this.field = new Field(this.fieldTemplate)
    this.color = Utils.getRandomColor()
    this.menuColor = Utils.invertColor(this.color)

  }

  render(ctx: CanvasRenderingContext2D) {
    const fontSize = Config.height * 5 / 100

    ctx.fillStyle = this.color
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

    ctx.fillStyle = this.menuColor
    ctx.fillText(this.menu[this.index], Config.width / 2, Config.height / 2 - this.menu.length / 2 * fontSize + this.index * fontSize)
  }

  select() {
    switch (this.menu[this.index]) {
      case 'Start':
        const tetris = new TetrisScreen(this.game)
        tetris.start()
        this.game.setScreen(tetris)
        break;
      case 'Options':
        alert('SOON')
        break;
      case 'About':
        alert('SOON')
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
  }

}
