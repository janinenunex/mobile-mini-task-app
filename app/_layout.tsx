import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#687280",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="add-tasks"
        options={{
          title: "Add Task",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="task-details"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",

    // Added the missing closing braces below
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1, // Added opacity to make shadow visible on iOS
    shadowRadius: 4, // Added radius for a softer look
    elevation: 5, // Added elevation for Android shadow support
  }, // Fixed: Closing brace for tabBar was missing

  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
