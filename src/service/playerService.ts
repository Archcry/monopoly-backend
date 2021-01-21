import Player from "../domain/player";
import GameRepository from "../repository/gameRepository";
import PlayerRepository from "../repository/playerRepository";
import RandomStringGenerator from "../util/randomStringGenerator";

export default class PlayerService {
  constructor(
    private playerRepository: PlayerRepository, 
    private gameRepository: GameRepository, 
    private randomStringGenerator: RandomStringGenerator
  ) {}

  public async create(newPlayer: Omit<Player, "id"|"money">): Promise<Player> {
    const game = await this.gameRepository.get(newPlayer.gameId);

    if (game && !game.started) {
      return await this.createPlayer({ money: game.config.initialCash, ...newPlayer });
    }

    throw new Error("Could not add player to Game");
  }

  private async createPlayer(newPlayer: Omit<Player, "id">): Promise<Player> {
    const playerId = this.randomStringGenerator.generate();

    // Ensure no duplicate players are created
    if (await this.playerRepository.get(playerId)) {
      return await this.createPlayer(newPlayer);
    }

    console.log(`Adding player with id ${playerId} to game with id ${newPlayer.gameId}`);

    return await this.playerRepository.add({
      id: playerId,
      gameId: newPlayer.gameId,
      money: newPlayer.money,
      name: newPlayer.name
    });
  }
}
