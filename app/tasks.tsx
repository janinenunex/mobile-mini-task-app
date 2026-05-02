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
      console.error(error);
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
      console.error(error);
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
                  style={styles.editButton}
                  onPress={() =>
                    router.push({
                      pathname: "/task-details",
                      params: {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        status: item.status,
                        edit: "true",
                      },
                    })
                  }
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </Pressable>

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
    backgroundColor: "#020617", // Deep Obsidian Navy
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#F8FAFC",
    letterSpacing: -2,
    marginBottom: 24,
    textShadowColor: "rgba(139, 92, 246, 0.4)",
    textShadowRadius: 10,
  },
  addButton: {
    backgroundColor: "#8B5CF6", // Electric Violet
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 18,
    marginBottom: 32,
    alignSelf: "stretch", // Full width for a more modern, bold look
    alignItems: "center",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: "rgba(30, 41, 59, 0.5)", // Semi-transparent glass
    padding: 24,
    borderRadius: 28,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 15,
    color: "#94A3B8",
    lineHeight: 22,
    marginBottom: 20,
  },
  taskStatus: {
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#06B6D4", // Cyan highlight
    marginBottom: 16,
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    paddingTop: 18,
  },
  detailButton: {
    flex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  detailButtonText: {
    color: "#F8FAFC",
    fontWeight: "700",
    fontSize: 14,
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "rgba(225, 29, 72, 0.1)", // Translucent Rose
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(225, 29, 72, 0.2)",
  },
  deleteButtonText: {
    color: "#FB7185",
    fontWeight: "700",
    fontSize: 14,
  },
  editButton: {
    flex: 1,
    backgroundColor: "rgba(34, 197, 94, 0.1)", // Translucent Green
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.2)",
  },
  editButtonText: {
    color: "#22C55E",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginTop: 60,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
