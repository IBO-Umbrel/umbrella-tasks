import { Colors } from "@/constants/Colors";
import { Task, TaskStatus } from "@/store/taskStore";
import { format } from "date-fns";
import { StyleSheet, Text, TouchableNativeFeedback, TouchableNativeFeedbackProps, useColorScheme, View } from "react-native";


type TaskItemProps =
{
    task: Task;
    onPress?: TouchableNativeFeedbackProps["onPress"];
};


const TaskItem = ({task, onPress}: TaskItemProps) =>
{
    const colorScheme = useColorScheme() ?? "light";
    const getStatusColor = (status: TaskStatus) =>
    {
        switch (status) {
            case "pending":
                return "#facc15"; // yellow
            case "in-progress":
                return "#3b82f6"; // blue
            case "completed":
                return "#22c55e"; // green
            case "canceled":
                return "#ef4444"; // red
            default:
                return "#6b7280"; // gray
        }
    };
    const styles = StyleSheet.create({
        container: {
            padding: 12,
            backgroundColor: Colors[colorScheme].panel,
            borderRadius: 12,
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 }
        },
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontSize: 16,
            fontWeight: "600",
            color: Colors[colorScheme].text,
        },
        dateText: {
            fontSize: 12,
            color: Colors[colorScheme].other_text,
        },
        statusBadge: {
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 8,
        },
        statusText: {
            color: "#fff",
            fontWeight: "500",
            fontSize: 12,
            textTransform: "capitalize",
        },
    });


    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.title}>{task.title}</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(task.status) },
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {task.status.replace("-", " ")}
                        </Text>
                    </View>
                </View>
                {
                    task.description
                    ?
                    <Text
                        style={{
                            color: Colors[colorScheme].other_text,
                            marginTop: 10
                        }}
                    >
                        {task.description}
                    </Text>
                    :
                    null
                }
                {
                    task.location
                    ?
                    <Text style={[styles.dateText, {marginTop: 10}]}>
                        Location: {task.location}
                    </Text>
                    :
                    null
                }
                <Text style={[styles.dateText, {marginTop: 10}]}>
                    Creation: {format(new Date(task.createdAt), "MMM d, yyyy • h:mm a")}
                </Text>
                {
                    task.executionAt
                    ?
                    <Text style={styles.dateText}>
                        Execution: {format(new Date(task.executionAt), "MMM d, yyyy • h:mm a")}
                    </Text>
                    :
                    null
                }
            </View>
        </TouchableNativeFeedback>
    );
};



export default TaskItem;