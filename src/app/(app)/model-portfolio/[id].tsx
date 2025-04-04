import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { Header } from '@/components/header';
import { SafeAreaView, Text, View } from '@/components/ui';

// type TimeSpan = '1Y' | '3Y' | '5Y' | '10Y';

type PortfolioMetadata = {
  riskLevel: number;
  type: 'TaxAdvantaged';
  created: string;
};

type Security = {
  description: string;
  allocation: number;
};

type Category = {
  category: 'Equity' | 'CASH';
  securities: Record<string, Security>;
};

type PortfolioBreakdown = Record<string, Category>;

function usePortfolioData(id: string) {
  const { data: metadata } = useQuery<PortfolioMetadata>({
    queryKey: ['portfolio', id],
    queryFn: () => fetch(`/portfolio/${id}`).then((res) => res.json()),
  });

  const { data: breakdown } = useQuery<PortfolioBreakdown>({
    queryKey: ['portfolio', id, 'breakdown'],
    queryFn: () =>
      fetch(`/portfolio/${id}/breakdown`).then((res) => res.json()),
  });

  return {
    metadata,
    breakdown,
  };
}

export default function ModelPortfolioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { metadata, breakdown } = usePortfolioData(id);

  if (!metadata || !breakdown) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header title="Loading..." />
        <View className="flex-1 items-center justify-center">
          <Text>Loading portfolio data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Model Portfolio" />

      {/* Portfolio Header */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Text className="text-2xl font-bold">
          Farther 80/20 Model Portfolio
        </Text>
        <View className="flex-row gap-2">
          <View className="rounded-full bg-neutral-100 px-3 py-1">
            <Text className="text-sm">Tax-Advantaged</Text>
          </View>
          <View className="rounded-full bg-neutral-100 px-3 py-1">
            <Text className="text-sm">Farther</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="flex-row border-b border-neutral-200 px-4">
        <View className="border-primary border-b-2 px-4 py-2">
          <Text className="font-medium">Model Details</Text>
        </View>
      </View>

      {/* Metadata Table */}
      <View className="border-b border-neutral-200 px-4 py-2">
        <View className="flex-row justify-between py-2">
          <Text className="text-neutral-600">Risk Level</Text>
          <Text>{metadata.riskLevel}</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-neutral-600">Tax Type</Text>
          <Text>{metadata.type}</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text className="text-neutral-600">Created</Text>
          <Text>{new Date(metadata.created).toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Content will be added in subsequent iterations */}
      <View className="flex-1 p-4">
        <Text>Portfolio breakdown will be added here</Text>
      </View>
    </SafeAreaView>
  );
}
