// pending.tsx
// Displays tasks with "Pending" status in a list.
import { useTaskDetails } from "@/components/TaskDetailProvider";
import TaskItem from "@/components/TaskItem";
import { Colors } from "@/constants/Colors";
import { useTaskStore } from "@/store/taskStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, useColorScheme, View } from "react-native";


export default function TasksPendingScreen()
{
    const navigation = useNavigation();
    const colorScheme = useColorScheme() ?? "light";
    const { tasks, getTasksByStatus } = useTaskStore(); // Access task state.
    const {setDetailsOpen, setSelectedTask} = useTaskDetails(); // Manage task details modal.
    const [data, setData] = useState(tasks);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();


    // Refresh task list func for the current status.
    const refresh = () =>
    {
        setRefreshing(true);
        const progressing_tasks = getTasksByStatus("pending");
        setData(progressing_tasks);
        setRefreshing(false);
    };

    // Open modal to add a new task.
    const add_task_handle = () =>
    {
        setSelectedTask({
            id: "",
            title: "",
            status: "pending",
            createdAt: 0,
            updatedAt: 0,
        });
        setDetailsOpen(true);
    };

    // Updates task list and header when screen is focused.
    useEffect(() =>
    {
        if (isFocused)
        {
            refresh();

            // Adds "Add" button to header.
            navigation.getParent()?.setOptions({
                headerRight()
                {
                    return (
                        <TouchableOpacity onPress={add_task_handle}>
                            <View
                                style={{
                                    backgroundColor: Colors[colorScheme].accent,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    paddingRight: 15,
                                    borderRadius: 100,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5,
                                    elevation: 2
                                }}
                            >
                                <MaterialIcons
                                    name="add"
                                    size={25}
                                    color={Colors[colorScheme].text}
                                />
                                <Text
                                    style={{
                                        color: Colors[colorScheme].text,
                                        fontWeight: "500",
                                    }}
                                >Add</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }
            });
        }
    }, [isFocused]);


    return (
        <View
            style={{flex:1}}
        >
            <FlatList
                onRefresh={refresh}
                refreshing={refreshing}
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    gap: 10,
                    padding: 10
                }}
                // Display message when no tasks are available.
                ListEmptyComponent={() =>
                {
                    return (
                        <Text
                            style={{
                                color: Colors[colorScheme].text,
                                textAlign: "center",
                                fontSize: 20,
                                marginTop: 15
                            }}
                        >No Tasks Available</Text>
                    );
                }}
                renderItem={(args) =>
                {
                    // console.log(args.item)
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
        </View>
    );
}
