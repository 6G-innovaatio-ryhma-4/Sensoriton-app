import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { main } from '@/assets/colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Koti',
          tabBarIcon: ({ color}) => <IconSymbol size={28} name="house.fill" color={main.accent} />,
        }}
      />
      <Tabs.Screen
        name="simulaatio"
        options={{
          title: 'Vaihda Tilanne',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={main.accent} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={main.accent} />,
        }}
        />
      <Tabs.Screen
      name="asetukset"
      options={{
        title: 'Vaihda Tilanne',
        tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={main.accent} />,
      }}
      />
      </Tabs>
  );
}
