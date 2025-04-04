import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

// import { client } from '../common';
import type { PortfolioMetadata } from './types';

type Variables = { id: string };
type Response = PortfolioMetadata;

// Temporary mock data
const MOCK_DATA: Response = {
  riskLevel: 69,
  type: 'TaxAdvantaged',
  created: '2023-9-13',
};

export const usePortfolio = createQuery<Response, Variables, AxiosError>({
  queryKey: ['portfolio'],
  fetcher: (_variables) => {
    // Temporarily return mock data
    return Promise.resolve(MOCK_DATA);

    // Real implementation:
    // return client
    //   .get(`portfolio/${variables.id}`)
    //   .then((response) => response.data);
  },
});
