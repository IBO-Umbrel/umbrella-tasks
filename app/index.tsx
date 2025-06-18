import TaskDetailModal from "@/components/TaskDetailModal";
import TaskItem from "@/components/TaskItem";
import { Task, useTaskStore } from "@/store/taskStore";
import { useState } from "react";
import { Button, FlatList, View } from "react-native";


export default function Index()
{
    const { tasks, addTask, updateTask } = useTaskStore();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);


    const add_task_handle = () =>
    {
    };


    return (
        <View
            style={{
                flex: 1,
                // padding: 16
            }}
        >
            <Button
                title="Add Task"
                onPress={add_task_handle}
            />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={(arg) =>
                    <TaskItem
                        onPress={() =>
                        {
                            setSelectedTask(arg.item);
                            setDetailsOpen(true);
                        }}
                        task={arg.item}
                    />
                }
                contentContainerStyle={{
                    padding: 16,
                    gap: 10
                }}
            />

            <TaskDetailModal
                task={selectedTask}
                isOpen={detailsOpen}
                onSave={(arg) =>
                {
                    updateTask(arg.id, arg);
                }}
                onClose={() => {}}
            />
        </View>
    );
}
