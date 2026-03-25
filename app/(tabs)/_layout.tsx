import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { main } from '@/assets/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: main.accent,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: main.background,
          borderTopWidth: 0,
          height: 70,
        },
      }}
    >
      <Tabs.Screen
        name="Kotisivu"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/homeIcon.png")}
              style={{
                width: 28,
                height: 28,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="simulaatio"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icons/WrenchIcon.png")}
              style={{
                width: 28,
                height: 28,
                opacity: focused ? 1 : 0.5,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chat" size={28} color={main.accent} />,
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