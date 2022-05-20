import Game from "../Game";

export default abstract class Screen {

  public game: Game

  constructor(game: Game) {
    this.game = game
  }

  abstract render(ctx: CanvasRenderingContext2D): void

  abstract keyPressed(e: KeyboardEvent): void

}