import { cryptoAssets } from "../portfolio-header/transaction-card/coin-icon-url";
import type { Holding } from "../portfolio-dialog/portfolio-dialog-interfaces";
import type { AssetsInfo } from "./data-table-interfaces";

export function mapHoldingsToAssetsInfo(holdings: Holding[]): AssetsInfo[] {
  return holdings.map((holding) => ({
    name: {
      name: holding.name,
      ticker: holding.ticker,
      iconURL: cryptoAssets[holding.ticker]?.logo || "",
    },
    price: holding.currentPrice,
    hourChange: holding.oneHourChangePercent,
    dayChange: holding.yesterdayChangePercent,
    weekChange: holding.sevenDaysChangePercent,
    holdings: {
      amount: `${holding.quantity} ${holding.ticker}`,
      value: holding.totalValue,
    },
    averageBuyPrice: holding.averagePurchasePrice,
    profitLoss: {
      value: holding.plValue,
      percent: holding.plPercentValue,
    },
  }));
}
