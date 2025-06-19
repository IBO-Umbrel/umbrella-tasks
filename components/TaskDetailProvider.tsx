import { Task, useTaskStore } from "@/store/taskStore";
import { createContext, useContext, useState } from "react";
import TaskDetailModal from "./TaskDetailModal";

const TaskDetailContext = createContext({
    selectedTask: null,
    setSelectedTask: () => null,
    detailsOpen: false,
    setDetailsOpen: () => false,
} as {
    selectedTask: Task | null;
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
    detailsOpen: boolean;
    setDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
});

export const TaskDetailProvider = ({ children }: { children: any }) =>
{
    const { addTask, updateTask, deleteTask } = useTaskStore();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    return (
        <TaskDetailContext.Provider value={{ detailsOpen, setDetailsOpen, selectedTask, setSelectedTask }}>
            {children}
            <TaskDetailModal
                task={selectedTask}
                isOpen={detailsOpen}
                onSave={(task) =>
                {
                    if (task.id === "")
                    {
                        const created_task = addTask(task.title, task.description, task.executionAt);
                        const updates = {
                            title: task.title,
                            description: task.description,
                            location: task.location,
                            executionAt: task.executionAt,
                            status: task.status,
                            updatedAt: task.updatedAt
                        };
                        updateTask(created_task.id, updates);
                    }
                    else
                    {
                        updateTask(task.id, task);
                    }
                }}
                onClose={() => setDetailsOpen(false)}
                onDelete={selectedTask ? selectedTask.id === "" ? undefined : () => deleteTask(selectedTask.id) : undefined}
            />
        </TaskDetailContext.Provider>
    );
};

export const useTaskDetails = () => useContext(TaskDetailContext);