import TaskDetailModal from "@/components/TaskDetailModal";
import TaskItem from "@/components/TaskItem";
import { Task, useTaskStore } from "@/store/taskStore";
import { useState } from "react";
import { FlatList, View } from "react-native";


export default function InProgress()
{
    const { tasks, addTask, updateTask, getTasksByStatus } = useTaskStore();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);


    return (
        <View
            style={{
                flex: 1,
                // padding: 16
            }}
        >
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                // style={{
                //     flex: 1,
                //     height:
                // }}
                contentContainerStyle={{
                    gap: 10,
                    padding: 10
                }}
                renderItem={(args) =>
                {
                    return (
                        <TaskItem
                            task={args.item}
                            onPress={() =>
                            {
                                setSelectedTask(args.item);
                                setDetailsOpen(true);
                            }}
                        />
                    );
                }}
            />

            <TaskDetailModal
                task={selectedTask}
                isOpen={detailsOpen}
                onSave={(task) =>
                {
                    if (task.id === "")
                    {
                        const created_task = addTask(task.title, task.description, task.executionAt);
                        updateTask(created_task.id, task);
                    }
                    updateTask(task.id, task);
                }}
                onClose={() => setDetailsOpen(false)}
            />
        </View>
    );
}
