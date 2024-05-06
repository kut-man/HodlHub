export interface Coin {
  name: string;
  ticker: string;
  iconURL: string;
}

export type AssetsInfo = {
  name: Coin;
  price: number;
  hourChange: number;
  dayChange: number;
  weekChange: number;
  holdings: number;
  averageBuyPrice: number;
  profitLoss: number;
};
