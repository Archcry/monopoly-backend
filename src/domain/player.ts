import FinancialEntity from "./financialEntity";

export default interface Player extends FinancialEntity {
  id: string;
  gameId: string;
  name: string;
}
