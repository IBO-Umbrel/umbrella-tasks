import { Colors } from "@/constants/Colors";
import { Task, TaskStatus } from "@/store/taskStore";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Button,
    Dimensions,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import Input from "./Input";
import PickerInput from "./PickerInput";

interface TaskDetailModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose?: () => void;
    onDelete?: () => void;
    onSave: (updatedTask: Task) => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
    task,
    isOpen,
    onClose,
    onDelete,
    onSave,
}) => {
    const colorScheme = useColorScheme() ?? "light";
    const [editableTask, setEditableTask] = useState<Task | null>(task);
    const [iosDate, setIosDate] = useState<Date | null>(null);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const styles = StyleSheet.create({
        backdrop: {
            flex: 1,
            backgroundColor: "#00000055",
        },
        sheet: {
            position: "absolute",
            bottom: 0,
            paddingBottom: 40,
            width: "100%",
            backgroundColor: Colors[colorScheme].panel,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "90%",
            overflow: "hidden",
        },
        container: {
            padding: 20,
        },
        label: {
            marginTop: 12,
            fontSize: 12,
            color: Colors[colorScheme].accent
        },
        input: {
            borderBottomWidth: 1,
            borderColor: Colors[colorScheme].text,
            paddingVertical: 6,
            marginBottom: 10,
        },
        picker: {
            height: 50,
            marginBottom: 10,
        },
        timestamp: {
            fontSize: 12,
            color: Colors[colorScheme].other_text,
            marginTop: 10,
        },
        buttonGroup: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
        },
    });

    useEffect(() => {
        if (isOpen && task) {
            setEditableTask(task);
            setIosDate(
                task.executionAt ? new Date(task.executionAt) : new Date()
            );
            Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen, task]);

    const showDatePicker = () => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                value: editableTask?.executionAt
                    ? new Date(editableTask.executionAt)
                    : new Date(),
                // mode: "date",
                is24Hour: true,
                onChange: (_event, date) => {
                    if (date && editableTask) {
                        setEditableTask({
                            ...editableTask,
                            executionAt: date.getTime(),
                        });
                    }
                },
            });
        }
    };

    const handleSave = () => {
        if (editableTask) {
            onSave({ ...editableTask, updatedAt: Date.now() });
        }
        onClose?.();
    };

    const handleIosChange = (_event: any, selectedDate?: Date) => {
        if (selectedDate && editableTask) {
            setIosDate(selectedDate);
            setEditableTask({
                ...editableTask,
                executionAt: selectedDate.getTime(),
            });
        }
    };

    if (!editableTask) return null;

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
            navigationBarTranslucent
        >
            <Pressable
                style={styles.backdrop}
                onPress={onClose}
            />
            <Animated.View
                style={[styles.sheet, { transform: [{ translateY }] }]}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <Input
                            label="Title"
                            value={editableTask.title}
                            onChangeText={(text) => setEditableTask({ ...editableTask, title: text })}
                        />
                        <Input
                            multiline
                            label="Description"
                            value={editableTask.description}
                            onChangeText={(text) => setEditableTask({ ...editableTask, description: text })}
                        />
                        <Input
                            label="Location"
                            value={editableTask.location}
                            onChangeText={(text) => setEditableTask({ ...editableTask, location: text })}
                        />
                        <PickerInput
                            label="Status"
                            selectedValue={editableTask.status}
                            onValueChange={(value) =>
                                setEditableTask({
                                    ...editableTask,
                                    status: value as TaskStatus,
                                })
                            }
                            items={[
                                { label: "Pending", value: "pending" },
                                { label: "In Progress", value: "in-progress" },
                                { label: "Completed", value: "completed" },
                                { label: "Canceled", value: "canceled" },
                            ]}
                        />

                        <Text style={styles.label}>Execution Time</Text>
                        <Pressable
                            onPress={showDatePicker}
                            style={styles.input}
                        >
                            <Text
                                style={{color: Colors[colorScheme].text}}
                            >
                                {editableTask.executionAt
                                    ? new Date(
                                        editableTask.executionAt
                                    ).toLocaleString()
                                    : "Select time"}
                            </Text>
                        </Pressable>

                        {Platform.OS === "ios" && (
                            <DateTimePicker
                                value={iosDate ?? new Date()}
                                mode="datetime"
                                display="inline"
                                onChange={handleIosChange}
                            />
                        )}

                        <Text style={styles.timestamp}>
                            Created At:{" "}
                            {new Date(editableTask.createdAt).toLocaleString()}
                        </Text>

                        <View style={styles.buttonGroup}>
                            <Button
                                title="Delete"
                                color="#ef4444"
                                onPress={() =>
                                {
                                    onDelete?.();
                                    onClose?.();
                                }}
                            />
                            <Button
                                title="Cancel"
                                color="#6b7280"
                                onPress={onClose}
                            />
                            <Button
                                title="Save"
                                // color={Colors[colorScheme].accent}
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Animated.View>
        </Modal>
    );
};

export default TaskDetailModal;
