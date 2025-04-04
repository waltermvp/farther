import { useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { usePortfolio, usePortfolioBreakdown } from '@/api/portfolio';
import { Header } from '@/components/header';
import { MetadataCard } from '@/components/model-portfolio/metadata-card';
import { TabNavigation } from '@/components/tab-navigation';
import { SafeAreaView, Text, View } from '@/components/ui';

const TABS = [
  { id: 'accounts', label: 'Accounts' },
  { id: 'model-details', label: 'Model Details' },
] as const;

export default function ModelPortfolioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = React.useState<string>('model-details');

  const { data: metadata } = usePortfolio({
    variables: { id },
  });

  const { data: breakdown } = usePortfolioBreakdown({
    variables: { id },
  });

  if (!metadata || !breakdown) {
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
      {/* Title and Tags */}
      <Header
        title="Farther 80/20 Model Portfolio"
        tags={[{ label: 'Tax-Advantaged' }, { label: 'Farther' }]}
      />

      {/* Navigation Tabs */}
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

      {/* Content will be added in subsequent iterations */}
      <View className="flex-1 p-4">
        <Text className="text-white">
          Portfolio breakdown will be added here
        </Text>
      </View>
    </SafeAreaView>
  );
}
