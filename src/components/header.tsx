import * as React from 'react';

import { Text, View } from '@/components/ui';

type Tag = {
  label: string;
};

type Props = {
  title: string;
  tags?: Tag[];
};

export function Header({ title, tags = [] }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <Text className="text-2xl font-medium text-white dark:text-black">
        {title}
      </Text>
      <View className="flex-row gap-2">
        {tags.map((tag) => (
          <View
            key={tag.label}
            className="rounded-full bg-neutral-700 px-3 py-1"
          >
            <Text className="text-sm text-white">{tag.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
