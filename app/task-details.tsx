import { updateTask } from "@/lib/database";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function TaskDetail() {
  const { id, title, description, status, edit } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
    edit?: string;
  }>();

  const isEditing = edit === "true";

  const [editedTitle, setEditedTitle] = useState(title || "");
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [editedStatus, setEditedStatus] = useState(status || "");
  const [showStatusOptions, setShowStatusOptions] = useState(false);

  const statusOptions = ["pending", "Ongoing", "Finished"];

  // 1. Add a ready state
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }
    try {
      updateTask(
        Number.parseInt(id),
        editedTitle,
        editedDescription,
        editedStatus,
      );
      Alert.alert("Success", "Task updated successfully");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update task");
    }
  };

  const handleCancel = () => {
    router.back();
  };

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
      <Text style={styles.headerTitle}>
        {isEditing ? "Edit Task" : "Task Detail"}
      </Text>

      <View style={styles.card}>
        <View style={styles.detailGroup}>
          <Text style={styles.label}>Identifier</Text>
          <Text style={styles.idValue}># {id}</Text>
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.label}>Task Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Enter task title"
              placeholderTextColor="#666"
            />
          ) : (
            <Text style={styles.value}>{title}</Text>
          )}
        </View>

        <View style={styles.detailGroup}>
          <Text style={styles.label}>Description</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={editedDescription}
              onChangeText={setEditedDescription}
              placeholder="Enter description"
              placeholderTextColor="#666"
              multiline
            />
          ) : (
            <Text style={styles.descriptionValue}>
              {description || "No additional details provided."}
            </Text>
          )}
        </View>

        <View style={[styles.detailGroup, styles.lastDetailGroup]}>
          <Text style={styles.label}>Status</Text>
          {isEditing ? (
            <View>
              <Pressable
                style={styles.dropdownButton}
                onPress={() => setShowStatusOptions(!showStatusOptions)}
              >
                <Text style={styles.dropdownText}>
                  {editedStatus || "Select status"}
                </Text>
                <Text style={styles.dropdownArrow}>
                  {showStatusOptions ? "▲" : "▼"}
                </Text>
              </Pressable>
              {showStatusOptions && (
                <View style={styles.optionsContainer}>
                  {statusOptions.map((option, index) => (
                    <Pressable
                      key={option}
                      style={[
                        styles.option,
                        index === statusOptions.length - 1 && styles.lastOption,
                      ]}
                      onPress={() => {
                        setEditedStatus(option);
                        setShowStatusOptions(false);
                      }}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
        </View>
      </View>

      {isEditing && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617", // Matches Index and Task list
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingTop: 80, // Extra breathing room for the header
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: -2,
    marginBottom: 32,
    textShadowColor: "rgba(139, 92, 246, 0.3)",
    textShadowRadius: 15,
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.4)", // Glassmorphism
    borderRadius: 32,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  detailGroup: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  lastDetailGroup: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 11,
    fontWeight: "900",
    color: "#64748B", // Dimmed slate
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F8FAFC",
    letterSpacing: -0.5,
  },
  idValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8B5CF6", // Violet
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  descriptionValue: {
    fontSize: 17,
    color: "#94A3B8",
    lineHeight: 26,
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(6, 182, 212, 0.1)", // Translucent Cyan
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(6, 182, 212, 0.2)",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#06B6D4", // Cyan
    marginRight: 10,
    // Add a glow to the dot
    shadowColor: "#06B6D4",
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  statusText: {
    color: "#06B6D4",
    fontSize: 14,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    color: "#F8FAFC",
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cancelButtonText: {
    color: "#F8FAFC",
    fontWeight: "700",
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    color: "#F8FAFC",
    fontSize: 16,
  },
  dropdownArrow: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  optionsContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionText: {
    color: "#F8FAFC",
    fontSize: 16,
  },
});
