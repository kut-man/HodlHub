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
  holdings: {
    amount: string;
    value: number;
  };
  averageBuyPrice: number;
  profitLoss: {
    value: number;
    percent: number;
  };
};
