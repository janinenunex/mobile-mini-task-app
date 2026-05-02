import { addTask } from "@/lib/database";
import { router } from "expo-router";

import React, { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const statusOptions = ["pending", "Ongoing", "Finished"];
export default function addTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Title is required");
      }
      //call the addtask function from database
      await addTask(title, description, status);

      Alert.alert("Saved!", `Task "${title}" has been added successfully.`);
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Add Task </Text>

      <TextInput
        style={[styles.input]}
        placeholder="Enter Task Title: "
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Task Description: "
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusContainer}>
        {statusOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.statusButton,
              status === option && styles.statusButtonActive,
            ]}
            onPress={() => setStatus(option)}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === option && styles.statusButtonTextActive,
              ]}
            >
              {" "}
              {option}{" "}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F1F5F9", // Light gray fill instead of just a border
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1E293B",
    borderWidth: 1,
    borderColor: "transparent", // Clean look, can change to color on focus
    marginBottom: 20,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 12, // Tighter gap for a more cohesive chip look
    marginBottom: 32,
    flexWrap: "wrap",
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100, // Pill shape for modern toggle buttons
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statusButtonActive: {
    backgroundColor: "#6366F1", // Indigo primary accent
    borderColor: "#6366F1",
    // Gentle glow for the active state
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  statusButtonText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 14,
  },
  statusButtonTextActive: {
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#0F172A", // Dark Slate
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
