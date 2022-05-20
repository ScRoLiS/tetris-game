import Game from './game';
import 'normalize.css'
import './index.css'

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const game = new Game(canvas)