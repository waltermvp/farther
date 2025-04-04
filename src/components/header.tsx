import { useRouter } from 'expo-router';
import * as React from 'react';

import { Pressable, Text, View } from '@/components/ui';

type Props = {
  title: string;
  showBack?: boolean;
};

export function Header({ title, showBack = true }: Props) {
  const router = useRouter();

  return (
    <View className="flex-row items-center border-b border-neutral-200 px-4 py-3">
      {showBack && (
        <Pressable onPress={router.back} className="mr-3">
          <Text className="text-primary">Back</Text>
        </Pressable>
      )}
      <Text className="flex-1 text-lg font-medium">{title}</Text>
    </View>
  );
}
