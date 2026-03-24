import { Tabs } from "expo-router";
import { Image } from "react-native";
import { main } from "../../assets/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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