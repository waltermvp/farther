import * as React from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/components/ui';

type Tab = {
  id: string;
  label: string;
};

type Props = {
  tabs: readonly Tab[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
};

export function TabNavigation({ tabs, activeTab, onTabPress }: Props) {
  return (
    <View className="flex-row border-b border-neutral-700">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabPress(tab.id)}
            className={`px-6 py-4 ${isActive ? 'border-b-2 border-white' : ''}`}
          >
            <Text className={isActive ? 'text-white' : 'text-neutral-500'}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
