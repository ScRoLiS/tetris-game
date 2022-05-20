import { Game } from './game/Game';
import 'normalize.css'
import './index.css'
import { MenuScreen } from './game/screen';

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const game = new Game(canvas)

game.start()