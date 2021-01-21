import Game from "../domain/game";
import GameRepository from "../repository/gameRepository";
import RandomStringGenerator from "../util/randomStringGenerator";

export default class GameService {
  constructor (
    private gameRepository: GameRepository,
    private randomStringGenerator: RandomStringGenerator
  ) {}

  public async create(newGame: Omit<Game, "id"|"started"|"feeJar">): Promise<Game> {
    return this.createGame({ started: false, feeJar: { money: 0 }, ...newGame });
  }

  private async createGame(newGame: Omit<Game, "id">): Promise<Game> {
    const gameId = this.randomStringGenerator.generate();

    if (await this.gameRepository.get(gameId)) {
      return await this.createGame(newGame);
    }

    console.log(`Creating game with id ${gameId}`);

    return await this.gameRepository.add({
      id: gameId,
      started: false,
      config: {
        initialCash: newGame.config.initialCash,
        goCash: newGame.config.goCash,
        jailFee: newGame.config.jailFee,
      },
      feeJar: {
        money: 0
      }
    });
  }
}
