import * as express from 'express';
import GameService from './service/gameService';
import * as bodyParser from 'body-parser';
import PlayerService from './service/playerService';
import PlayerRepository from './repository/playerRepository';
import GameRepository from './repository/gameRepository';
import RandomStringGenerator from './util/randomStringGenerator';

const port = 3000;

class App {
  private gameService: GameService;
  private playerService: PlayerService;

  constructor(private app: express.Application) {
    const playerRepository = new PlayerRepository();
    const gameRepository = new GameRepository();
    const randomStringGenerator = new RandomStringGenerator();

    this.playerService = new PlayerService(playerRepository, gameRepository, randomStringGenerator);
    this.gameService = new GameService(gameRepository, randomStringGenerator);

    this.installMiddleware(app);
    this.installHandlers(app);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  }

  private installMiddleware(app: express.Application) {
    app.use(bodyParser.json());
  }

  private installHandlers(app: express.Application) {
    app.post("/game", (req, res) => this.gameService.create(req.body)
      .then(game => res.status(201).send(game))
      .catch(e => res.status(400).send(e)));

    app.post("/player", (req, res) => this.playerService.create(req.body)
      .then(player => res.status(201).send(player))
      .catch(e => res.status(400).send(e)));
  }
}

const app = new App(express());

app.start(port);
