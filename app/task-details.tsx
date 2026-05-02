import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    InteractionManager,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function TaskDetail() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  // 1. Add a ready state
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 2. Wait for the navigation animation to finish
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  // 3. Show a lightweight loader while transitioning
  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color="#6366F1" size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.headerTitle}>Task Detail</Text>

      <View style={styles.card}>
        <View style={styles.detailGroup}>
          <Text style={styles.label}>Identifier</Text>
          <Text style={styles.idValue}># {id}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.label}>Task Name</Text>
          <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.descriptionValue}>
            {description || "No additional details provided."}
          </Text>
        </View>

        <View style={[styles.detailGroup, styles.lastDetailGroup]}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Ultra-light slate background
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    // Premium soft shadow
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  detailGroup: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  lastDetailGroup: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  idValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366F1", // Indigo accent for the ID
    fontFamily: "System",
  },
  descriptionValue: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366F1",
    marginRight: 8,
  },
  statusText: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
