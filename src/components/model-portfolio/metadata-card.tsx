import * as React from 'react';

import { Text, View } from '@/components/ui';

type Props = {
  riskLevel: string;
  taxType: string;
  created: string;
};

export function MetadataCard({ riskLevel, taxType, created }: Props) {
  return (
    <View className="mx-4 mt-4 rounded-lg bg-neutral-800">
      <View className="flex-row justify-between border-b border-neutral-700 p-4">
        <Text className="text-white">Risk Level</Text>
        <View className="rounded-full bg-neutral-700 px-3 py-1">
          <Text className="text-white">{riskLevel}</Text>
        </View>
      </View>
      <View className="flex-row justify-between border-b border-neutral-700 p-4">
        <Text className="text-white">Tax Type</Text>
        <View className="rounded-full bg-neutral-700 px-3 py-1">
          <Text className="text-white">{taxType}</Text>
        </View>
      </View>
      <View className="flex-row justify-between p-4">
        <Text className="text-white">Created</Text>
        <Text className="text-neutral-400">{created}</Text>
      </View>
    </View>
  );
}
