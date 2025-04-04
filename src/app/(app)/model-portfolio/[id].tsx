import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import type { TimeSpan } from '@/api/portfolio';
import {
  usePortfolio,
  usePortfolioBreakdown,
  usePortfolioPerformance,
} from '@/api/portfolio';
import { Header } from '@/components/header';
import { BreakdownTable } from '@/components/model-portfolio/breakdown-table';
import { MetadataCard } from '@/components/model-portfolio/metadata-card';
import { PerformanceCard } from '@/components/model-portfolio/performance-card';
import { TabNavigation } from '@/components/tab-navigation';
import { SafeAreaView, Text, View } from '@/components/ui';

const TABS = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'model-details', label: 'Model Details' },
] as const;

export default function ModelPortfolioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState<string>('model-details');
  const [timeSpan, setTimeSpan] = React.useState<TimeSpan>('1Y');

  const { data: metadata } = usePortfolio({
    variables: { id },
  });

  const { data: breakdown } = usePortfolioBreakdown({
    variables: { id },
  });

  const { data: performance } = usePortfolioPerformance({
    variables: { id, timeSpan },
  });

  if (!metadata || !breakdown || !performance) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-900">
        <Header title="Farther 80/20 Model Portfolio" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-white">Loading portfolio data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <Header
        title="Farther 80/20 Model Portfolio"
        tags={[{ label: 'Tax-Advantaged' }, { label: 'Farther' }]}
      />

      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />

      <MetadataCard
        riskLevel="Aggressive"
        taxType="Tax-advantaged"
        created={new Date(metadata.created).toLocaleDateString()}
      />

      <PerformanceCard
        value={performance.twr}
        timeSpan={timeSpan}
        onTimeSpanChange={setTimeSpan}
      />

      <BreakdownTable data={breakdown} />
    </SafeAreaView>
  );
}
