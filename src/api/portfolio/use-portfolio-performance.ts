import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

// import { client } from '../common';
import type { PortfolioPerformance, TimeSpan } from './types';

type Variables = {
  id: string;
  timeSpan: TimeSpan;
};

type Response = PortfolioPerformance;

// Temporary mock data
const MOCK_DATA: Response = {
  twr: 15.75,
};

export const usePortfolioPerformance = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ['portfolio-performance'],
  fetcher: (_variables) => {
    // Temporarily return mock data
    return Promise.resolve(MOCK_DATA);

    // Real implementation:
    // return client
    //   .get(`portfolio/${variables.id}/performance/${variables.timeSpan}`)
    //   .then((response) => response.data);
  },
});
