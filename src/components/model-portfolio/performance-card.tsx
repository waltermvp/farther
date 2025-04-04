import * as React from 'react';
import { Pressable } from 'react-native';

import type { TimeSpan } from '@/api/portfolio';
import { Text, View } from '@/components/ui';

type Props = {
  value: number;
  timeSpan: TimeSpan;
  onTimeSpanChange: (span: TimeSpan) => void;
};

const TIME_SPANS: TimeSpan[] = ['1Y', '3Y', '5Y', '10Y'];

export function PerformanceCard({ value, timeSpan, onTimeSpanChange }: Props) {
  return (
    <View className="m-4 rounded-lg bg-neutral-800">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-lg font-medium text-white">
          Historical Performance
        </Text>
        <Text
          className={`text-lg ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          {value >= 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
        </Text>
      </View>

      <View className="flex-row border-t border-neutral-700 p-2">
        {TIME_SPANS.map((span) => (
          <Pressable
            key={span}
            onPress={() => onTimeSpanChange(span)}
            className={`flex-1 rounded-md p-2 ${
              timeSpan === span ? 'bg-neutral-700' : ''
            }`}
          >
            <Text
              className={`text-center ${
                timeSpan === span ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {span}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
