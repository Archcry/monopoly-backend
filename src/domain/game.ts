import FinancialEntity from './financialEntity';
import GameConfiguration from './gameConfiguration';

export default interface Game {
  id: string;
  started: boolean;
  feeJar: FinancialEntity;
  config: GameConfiguration;
}
