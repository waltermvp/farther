export type PortfolioMetadata = {
  riskLevel: number;
  type: 'TaxAdvantaged';
  created: string;
};

export type Security = {
  description: string;
  allocation: number;
};

export type Category = {
  category: 'Equity' | 'CASH';
  securities: Record<string, Security>;
};

export type PortfolioBreakdown = Record<string, Category>;

export type TimeSpan = '1Y' | '3Y' | '5Y' | '10Y';

export type PortfolioPerformance = {
  twr: number;
};
