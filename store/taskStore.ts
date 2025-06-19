import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";





// Types
export type TaskStatus = "pending" | "in-progress" | "completed" | "canceled";
export interface Task
{
    id: string;
    title: string;
    description?: string;
    location?: string;
    status: TaskStatus;
    executionAt?: number;
    createdAt: number;
    updatedAt: number;
}
interface TaskStore
{
    tasks: Task[];
    addTask: (title: string, description?: string, executionAt?: number) => Task;
    getTaskById: (id: string) => Task | undefined;
    getTasksByStatus: (status: TaskStatus) => Task[];
    updateTask: (
        id: string,
        updates: Partial<Omit<Task, "id" | "createdAt">>
    ) => void;
    deleteTask: (id: string) => void;
    clearAllTasks: () => void;
}

export function generate_task_id()
{
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 6);
    return `task-${timestamp}${random}`;
}

// Store
export const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: [],
            addTask: (title = "default", description, executionAt) =>
            {
                const newTask: Task = {
                    id: generate_task_id(),
                    title,
                    description,
                    executionAt,
                    createdAt: Date.now(),
                    status: "pending",
                    updatedAt: Date.now()
                };
                set({ tasks: [newTask, ...get().tasks] });
                return newTask;
            },
            getTaskById: (id) =>
            {
                return get().tasks.find((task) => task.id === id)
            },
            getTasksByStatus: (status) =>
            {
                return get().tasks.filter((task) => task.status === status)
            },
            updateTask: (id, updates) =>
            {
                set({
                    tasks: get().tasks.map((task) =>
                        task.id === id
                            ? { ...task, ...updates, updatedAt: Date.now() }
                            : task
                    ),
                });
            },
            deleteTask: (id) =>
            {
                set({ tasks: get().tasks.filter((task) => task.id !== id) });
            },
            clearAllTasks: () =>
            {
                set({ tasks: [] });
            },
        }),
        {
            name: "umbrella-tasks-storage", // Storage key
            storage: {
                getItem: async (name) =>
                {
                    const value = await AsyncStorage.getItem(name);
                    if (value)
                    {
                        return JSON.parse(value);
                    }
                    return value;
                },
                setItem: async (name, value) =>
                {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) =>
                {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);
