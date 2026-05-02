import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize the database.");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Mini Task Application</Text>
      <Pressable style={styles.button} onPress={() => router.push("/tasks")}>
        <Text style={styles.buttonText}>Open Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // Pure white for a crisp look
    paddingHorizontal: 40, // Prevents text from hitting edges on small screens
  },
  title: {
    fontSize: 32,
    fontWeight: "900", // Extra bold for a modern "editorial" feel
    color: "#1A1A1A",
    textAlign: "center",
    letterSpacing: -1, // Tight letter spacing is very trendy right now
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 16, // Thicker buttons feel more premium
    paddingHorizontal: 32,
    borderRadius: 100, // "Pill" shape is more approachable/modern than blocks
    marginTop: 10,
    // Add a soft glow instead of a harsh shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
