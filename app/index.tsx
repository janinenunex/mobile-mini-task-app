import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

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
      {/* 1. Decorative Atmospheric Backgrounds */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.contentContainer}>
        {/* 2. Brand Section */}
        <View style={styles.brandWrapper}>
          <View style={styles.miniBar} />
          <Text style={styles.subtitle}>Productivity Suite</Text>
          <Text style={styles.title}>Mini Task{"\n"}Application</Text>
        </View>

        {/* 3. The Glassmorphic Wrapper for the Button */}
        <View style={styles.glassCard}>
          <Text style={styles.cardText}>
            Streamline your daily workflow with precision.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push("/tasks")}
          >
            <Text style={styles.buttonText}>Open Task</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617", // Deepest Navy
    alignItems: "center",
    justifyContent: "center",
  },
  // Aurora Glows
  glowTop: {
    position: "absolute",
    top: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "rgba(99, 102, 241, 0.15)", // Indigo
  },
  glowBottom: {
    position: "absolute",
    bottom: -width * 0.2,
    left: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "rgba(6, 182, 212, 0.12)", // Cyan
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: 32,
  },
  brandWrapper: {
    marginBottom: 40,
  },
  miniBar: {
    width: 40,
    height: 4,
    backgroundColor: "#6366F1",
    borderRadius: 2,
    marginBottom: 16,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#F8FAFC",
    textAlign: "left",
    letterSpacing: -2,
    lineHeight: 48,
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 32,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  cardText: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#020617",
    fontWeight: "800",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  version: {
    position: "absolute",
    bottom: 40,
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
