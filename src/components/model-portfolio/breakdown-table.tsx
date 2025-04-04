import * as React from 'react';
import { Pressable } from 'react-native';

import type { PortfolioBreakdown } from '@/api/portfolio';
import { Text, View } from '@/components/ui';

type DrilldownLevel = 'category' | 'sub-category' | 'securities';

type DrilldownState = {
  level: DrilldownLevel;
  selectedCategory?: string;
  selectedSubCategory?: string;
};

type Props = {
  data: PortfolioBreakdown;
};

// eslint-disable-next-line max-lines-per-function
export function BreakdownTable({ data }: Props) {
  const [drilldown, setDrilldown] = React.useState<DrilldownState>({
    level: 'category',
  });

  // Group by category first
  const categories = React.useMemo(() => {
    const result: Record<string, string[]> = {};

    Object.entries(data).forEach(([subCategory, details]) => {
      const category = details.category;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(subCategory);
    });

    return result;
  }, [data]);

  // Calculate allocations
  const getAllocation = React.useCallback(
    (key: string, level: DrilldownLevel) => {
      let total = 0;

      if (level === 'category') {
        // Sum all subcategories in this category
        Object.entries(data).forEach(([subCategory, details]) => {
          if (details.category === key) {
            Object.values(details.securities).forEach((security) => {
              total += security.allocation;
            });
          }
        });
      } else if (level === 'sub-category') {
        // Sum all securities in this subcategory
        const subCategory = data[key];
        if (subCategory) {
          Object.values(subCategory.securities).forEach((security) => {
            total += security.allocation;
          });
        }
      } else {
        // Direct security allocation
        const subCategory = data[drilldown.selectedSubCategory!];
        if (subCategory?.securities[key]) {
          total = subCategory.securities[key].allocation;
        }
      }

      return ((total / 1000) * 100).toFixed(2) + '%';
    },
    [data, drilldown.selectedSubCategory]
  );

  // eslint-disable-next-line max-lines-per-function
  const renderContent = () => {
    if (drilldown.level === 'category') {
      return Object.keys(categories).map((category) => (
        <Pressable
          key={category}
          onPress={() =>
            setDrilldown({
              level: 'sub-category',
              selectedCategory: category,
            })
          }
          className="flex-row items-center justify-between border-b border-neutral-700 p-4"
        >
          <Text className="text-white">{category}</Text>
          <View className="flex-row items-center">
            <Text className="mr-2 text-white">
              {getAllocation(category, 'category')}
            </Text>
            <Text className="text-neutral-400">›</Text>
          </View>
        </Pressable>
      ));
    }

    if (drilldown.level === 'sub-category' && drilldown.selectedCategory) {
      return (
        <>
          <Pressable
            onPress={() => setDrilldown({ level: 'category' })}
            className="flex-row items-center border-b border-neutral-700 p-4"
          >
            <Text className="text-neutral-400">‹ Back to Categories</Text>
          </Pressable>
          {categories[drilldown.selectedCategory].map((subCategory) => (
            <Pressable
              key={subCategory}
              onPress={() =>
                setDrilldown({
                  level: 'securities',
                  selectedCategory: drilldown.selectedCategory,
                  selectedSubCategory: subCategory,
                })
              }
              className="flex-row items-center justify-between border-b border-neutral-700 p-4"
            >
              <Text className="text-white">{subCategory}</Text>
              <View className="flex-row items-center">
                <Text className="mr-2 text-white">
                  {getAllocation(subCategory, 'sub-category')}
                </Text>
                <Text className="text-neutral-400">›</Text>
              </View>
            </Pressable>
          ))}
        </>
      );
    }

    if (drilldown.level === 'securities' && drilldown.selectedSubCategory) {
      const securities = data[drilldown.selectedSubCategory].securities;
      return (
        <>
          <Pressable
            onPress={() =>
              setDrilldown({
                level: 'sub-category',
                selectedCategory: drilldown.selectedCategory,
              })
            }
            className="flex-row items-center border-b border-neutral-700 p-4"
          >
            <Text className="text-neutral-400">
              ‹ Back to {drilldown.selectedCategory}
            </Text>
          </Pressable>
          {Object.entries(securities).map(([ticker, details]) => (
            <View
              key={ticker}
              className="flex-row items-center justify-between border-b border-neutral-700 p-4"
            >
              <View>
                <Text className="text-white">{ticker}</Text>
                <Text className="text-sm text-neutral-400">
                  {details.description}
                </Text>
              </View>
              <Text className="text-white">
                {getAllocation(ticker, 'securities')}
              </Text>
            </View>
          ))}
        </>
      );
    }

    return null;
  };

  return (
    <View className="mt-4 rounded-lg bg-neutral-800">
      <View className="flex-row items-center justify-between border-b border-neutral-700 p-4">
        <Text className="text-lg font-medium text-white">Model Breakdown</Text>
        <Text className="text-sm text-neutral-400">14 Securities</Text>
      </View>
      {renderContent()}
    </View>
  );
}
