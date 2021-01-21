import Player from "../domain/player";

export default class PlayerRepository {
  private players: Player[];

  constructor() {
    this.players = [];
  }

  public async add(newPlayer: Player): Promise<Player> {
    this.players.push(newPlayer);

    return newPlayer;
  }

  public async mutate(newPlayer: Player): Promise<Player> {
    const gameIndex = this.players.findIndex(player => player.id == player.id);

    if (gameIndex != -1) {
      this.players.splice(gameIndex, 1, newPlayer);

      return this.players[gameIndex];
    }

    throw new Error("Player not found");
  }

  public async get(playerId: string): Promise<Player | undefined> {
    return this.players.find(player => player.id == playerId);
  }
}
