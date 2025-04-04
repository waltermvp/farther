import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

// import { client } from '../common';
import type { PortfolioBreakdown } from './types';

type Variables = { id: string };
type Response = PortfolioBreakdown;

// Temporary mock data
const MOCK_DATA: Response = {
  Other: {
    category: 'CASH',
    securities: {
      CASH: {
        description: 'US Dollars',
        allocation: 400,
      },
    },
  },
  'US Small Cap Equity': {
    category: 'Equity',
    securities: {
      IJR: {
        description: 'iShares Core S&P Small-Cap ETF',
        allocation: 400,
      },
      IYW: {
        description: 'iShares U.S. Technology ETF',
        allocation: 267,
      },
    },
  },
  'US Mid Cap Equity': {
    category: 'Equity',
    securities: {
      SPMD: {
        description: 'SPDR® Portfolio S&P 400 Mid Cap ETF',
        allocation: 510,
      },
    },
  },
};

export const usePortfolioBreakdown = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ['portfolio-breakdown'],
  fetcher: (_variables) => {
    // Temporarily return mock data
    return Promise.resolve(MOCK_DATA);

    // Real implementation:
    // return client
    //   .get(`portfolio/${variables.id}/breakdown`)
    //   .then((response) => response.data);
  },
});
