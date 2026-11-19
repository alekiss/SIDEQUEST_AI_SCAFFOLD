import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import type { MainTabParamList } from "./types";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "800" },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={
              route.name === "Missões"
                ? "compass-outline"
                : "person-circle-outline"
            }
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Tab.Screen name="Missões" component={HomeScreen} />
      <Tab.Screen name="Meu perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
