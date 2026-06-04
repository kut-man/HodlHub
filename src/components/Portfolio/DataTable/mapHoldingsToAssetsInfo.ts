import { cryptoAssets } from "../PortfolioHeader/TransactionCard/coinIconUrl";
import { Holding } from "../PortfolioDialog/PortfolioDialogInterfaces";
import { AssetsInfo } from "./DataTableInterfaces";

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
