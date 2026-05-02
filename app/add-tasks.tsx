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
    backgroundColor: "#020617", // Deep obsidian theme
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: -2,
    marginTop: 80, // Balanced top breathing room
    marginBottom: 40,
  },
  label: {
    fontSize: 11,
    fontWeight: "900",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(30, 41, 59, 0.4)", // Translucent glass effect
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    color: "#F8FAFC",
    fontWeight: "600",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
    lineHeight: 24,
    paddingTop: 18,
  },
  // Status Selector Balance
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures items are spread evenly
    gap: 8,
    marginBottom: 40,
  },
  statusButton: {
    flex: 1, // Forces all buttons to be the exact same width
    height: 48, // Fixed height for vertical symmetry
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusButtonActive: {
    backgroundColor: "#8B5CF6", // Electric Violet accent
    borderColor: "#A78BFA",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  statusButtonText: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  // Main Action Button
  button: {
    backgroundColor: "#FFFFFF", // High-contrast white for primary action
    height: 64, // Larger touch target for the "Save" action
    borderRadius: 22,
    marginTop: "auto", // Pushes the button to the bottom of the container
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
