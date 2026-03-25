import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { main } from '@/assets/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: main.accent,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarInactiveBackgroundColor: main.bottomTab,
        tabBarActiveBackgroundColor: main.bottomTab,
        tabBarHideOnKeyboard: true,
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
          tabBarIcon: ({ color }) =><FontAwesome name="bullseye" size={24} color={main.accent} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat" size={24} color={main.accent} />,
        }}
        />
      <Tabs.Screen
      name="asetukset"
      options={{
        title: 'Asetukset',
        tabBarIcon: ({ color }) => <FontAwesome5 name="user-cog" size={24} color={main.accent} />,
      }}
      />
      </Tabs>
  );
}
