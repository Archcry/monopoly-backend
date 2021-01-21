import Game from "../domain/game";

export default class GameRepository {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  public async add(newGame: Game): Promise<Game> {
    this.games.push(newGame);

    return newGame;
  }

  public async mutate(game: Game): Promise<Game> {
    const gameIndex = this.games.findIndex(game => game.id == game.id);

    if (gameIndex != -1) {
      this.games.splice(gameIndex, 1, game);

      return game;
    }

    throw new Error("Game not found");    
  }

  public async get(gameId: string): Promise<Game | undefined> {
    return this.games.find(game => game.id == gameId);
  }
}
