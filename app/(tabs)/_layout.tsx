import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const hpTheme = {
    colors: {
      text: '#3A2D1C',
      accent: '#946B2D',
      background: '#FDF8E7',
    },
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: hpTheme.colors.accent,
        tabBarInactiveTintColor: hpTheme.colors.text,
        tabBarStyle: {
          backgroundColor: hpTheme.colors.background,
          borderTopColor: hpTheme.colors.accent,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'QCM',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Types de Sorciers',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
