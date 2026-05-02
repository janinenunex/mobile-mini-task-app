import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

//synce Method
const db = SQLite.openDatabaseSync("tasks.db");
export function initDatabase() {
  try {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL
            );
        `);
  } catch (error) {
    console.error("There was a problem initializing the database:", error);
  }
}

//FUnction for the addTask

export function addTask(title: string, description: string, status: string) {
  try {
    db.runSync(
      `
            INSERT INTO tasks (title, description, status) VALUES (?, ?, ?);
        `,
      [title, description, status],
    );
  } catch (error) {
    console.error("Error Adding Tasks:", error);
    throw error;
  }
}

//Function for the DeleteTask
export function deleteTask(id: number) {
  try {
    db.runSync(
      `
            DELETE FROM tasks WHERE id = ?;
        `,
      [id],
    );
  } catch (error) {
    console.error("Error Deleting Tasks:", error);
    throw error;
  }
}

//Function for the getTasks

export function getTasks(): Task[] {
  try {
    return db.getAllSync("SELECT * FROM tasks ORDER BY id DESC;");
  } catch (error) {
    console.error("Error Fetching Tasks:", error);
    throw error;
  }
}
