import { cryptoLogos } from "../PortfolioHeader/TransactionCard/coinIconUrl";
import { Holding } from "../PortfolioList/PortfolioDialog/PortfolioDialogInterfaces";
import { AssetsInfo } from "./DataTableInterfaces";

export function mapHoldingsToAssetsInfo(holdings: Holding[]): AssetsInfo[] {
    return holdings.map(holding => ({
      name: {
        name: holding.name,
        ticker: holding.ticker,
        iconURL: cryptoLogos[holding.ticker] || '',
      },
      price: holding.currentPrice,
      hourChange: holding.oneHourChangePercent,
      dayChange: holding.yesterdayChangePercent,
      weekChange: holding.sevenDaysChangePercent,
      holdings: holding.quantity,
      averageBuyPrice: holding.averagePurchasePrice,
      profitLoss: holding.plValue,
    }));
  }
  