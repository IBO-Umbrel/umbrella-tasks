import { useTaskDetails } from "@/components/TaskDetailProvider";
import TaskItem from "@/components/TaskItem";
import { Colors } from "@/constants/Colors";
import { useTaskStore } from "@/store/taskStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, useColorScheme, View } from "react-native";


export default function TasksAllScreen()
{
    const navigation = useNavigation();
    const colorScheme = useColorScheme() ?? "light";
    const { tasks } = useTaskStore();
    const {setDetailsOpen, setSelectedTask} = useTaskDetails();
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);


    const refresh = () =>
    {
        setRefreshing(true);
        setRefreshing(false);
    };
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
    useEffect(() =>
    {
        if (isFocused)
        {
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
                data={tasks}
                refreshing={refreshing}
                onRefresh={refresh}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    gap: 10,
                    padding: 10
                }}
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
