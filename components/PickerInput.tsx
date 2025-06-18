import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "react-native";

interface PickerInputProps {
    label: string;
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    items: { label: string; value: string }[];
}

const PickerInput: React.FC<PickerInputProps> = ({
    label,
    selectedValue,
    onValueChange,
    items,
}) => {
    const colorScheme = useColorScheme() ?? "light";
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.label,
                    {
                        color: isFocused
                            ? Colors[colorScheme].accent
                            : Colors[colorScheme].other_text,
                    },
                ]}
            >
                {label}
            </Text>
            <View
                style={[
                    styles.pickerWrapper,
                    {
                        borderColor: isFocused
                            ? Colors[colorScheme].accent
                            : Colors[colorScheme].other_text,
                        borderBottomWidth: isFocused ? 2 : 1,
                    },
                ]}
            >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(value) => onValueChange(value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    dropdownIconColor={Colors[colorScheme].text}
                    style={{
                        color: Colors[colorScheme].text,
                        ...Platform.select({
                            android: {
                                paddingVertical: -10, // adjust based on UI
                            },
                        }),
                    }}
                >
                    {items.map((item) => (
                        <Picker.Item
                            key={item.value}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    pickerWrapper: {
        borderWidth: 0,
    },
});

export default PickerInput;
