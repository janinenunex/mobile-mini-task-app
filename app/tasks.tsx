import { deleteTask, getTasks } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TaskScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = () => {
    try {
      const data = getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to Load the Tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const handleDelete = (id: number) => {
    try {
      deleteTask(id);
      loadTasks();
    } catch (error) {
      Alert.alert("Delete Error", "Failed to Delete the Task");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks List</Text>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-tasks")}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}> No Task </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.detailButton}
                  onPress={() =>
                    router.push({
                      pathname: "/task-details",
                      params: {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                      },
                    })
                  }
                >
                  <Text style={styles.detailButtonText}>View Task Details</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Soft off-white background
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: "#6366F1", // Modern Indigo
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 30,
    alignSelf: "flex-start",
    // Shadow/Elevation
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    // Subtle card shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 6,
  },
  taskDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 16,
  },
  taskStatus: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6366F1",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  detailButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#FFF1F2", // Soft red tint
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#E11D48", // Modern Rose/Red
    fontWeight: "600",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
});
