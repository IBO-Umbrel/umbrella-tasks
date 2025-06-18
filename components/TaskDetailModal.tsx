import { Task, TaskStatus } from "@/store/taskStore";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Button,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface TaskDetailModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = (
    {
        task,
        isOpen,
        onClose,
        onSave,
    }) =>
{
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["50%", "90%"], []);

    const [editableTask, setEditableTask] = useState<Task | null>(task);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() =>
    {
        if (isOpen && task)
        {
            sheetRef.current?.expand();
            setEditableTask(task);
        }
        else
        {
            sheetRef.current?.close();
        }
    }, [isOpen, task]);

    const handleSave = useCallback(() =>
    {
        if (editableTask) {
            onSave({ ...editableTask, updatedAt: Date.now() });
        }
        onClose();
    }, [editableTask]);

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) =>
    {
        setShowDatePicker(false);
        if (event.type === "set" && date && editableTask) {
            setEditableTask({ ...editableTask, executionAt: date.getTime() });
        }
    };

    if (!editableTask) return null;

    return (
        <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={snapPoints}
            onClose={onClose}
            enablePanDownToClose
        >
            <View style={styles.container}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={editableTask.title}
                    onChangeText={(text) =>
                        setEditableTask({ ...editableTask, title: text })
                    }
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={editableTask.description ?? ""}
                    onChangeText={(text) =>
                        setEditableTask({ ...editableTask, description: text })
                    }
                />

                <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.input}
                    value={editableTask.location ?? ""}
                    onChangeText={(text) =>
                        setEditableTask({ ...editableTask, location: text })
                    }
                />

                <Text style={styles.label}>Status</Text>
                <Picker
                    selectedValue={editableTask.status}
                    onValueChange={(value) =>
                        setEditableTask({
                            ...editableTask,
                            status: value as TaskStatus,
                        })
                    }
                    style={
                        Platform.OS === "android" ? styles.picker : undefined
                    }
                >
                    <Picker.Item
                        label="Pending"
                        value="pending"
                    />
                    <Picker.Item
                        label="In Progress"
                        value="in-progress"
                    />
                    <Picker.Item
                        label="Completed"
                        value="completed"
                    />
                    <Picker.Item
                        label="Canceled"
                        value="canceled"
                    />
                </Picker>

                <Text style={styles.label}>Execution Time</Text>
                <Pressable
                    onPress={() => setShowDatePicker(true)}
                    style={styles.input}
                >
                    <Text>
                        {editableTask.executionAt
                            ? new Date(
                                  editableTask.executionAt
                              ).toLocaleString()
                            : "Select time"}
                    </Text>
                </Pressable>
                {showDatePicker && (
                    <DateTimePicker
                        value={
                            editableTask.executionAt
                                ? new Date(editableTask.executionAt)
                                : new Date()
                        }
                        mode="datetime"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={handleDateChange}
                    />
                )}

                <Text style={styles.timestamp}>
                    Created At:{" "}
                    {new Date(editableTask.createdAt).toLocaleString()}
                </Text>

                <View style={styles.buttonGroup}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                    />
                    <Button
                        title="Cancel"
                        color="red"
                        onPress={onClose}
                    />
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: "bold",
        marginTop: 12,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 6,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        marginBottom: 10,
    },
    timestamp: {
        fontSize: 12,
        color: "#666",
        marginTop: 10,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

export default TaskDetailModal;
