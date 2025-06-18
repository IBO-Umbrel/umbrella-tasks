import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
    useColorScheme
} from "react-native";
import { FloatingLabelInput, FloatingLabelProps } from "react-native-floating-label-input";


function Input(props: FloatingLabelProps)
{
    const colorScheme = useColorScheme() ?? "light";
    const [isFocused, setIsFocused] = useState(false);

    
    return (
        <FloatingLabelInput
            {...props}
            inputStyles={{
                color: Colors[colorScheme].text,
                borderBottomWidth: isFocused ? 2 : 1,
                borderColor: isFocused ? Colors[colorScheme].accent : Colors[colorScheme].other_text
            }}
            containerStyles={{
                borderWidth: 0,
                marginVertical: 12
            }}
            customLabelStyles={{
                colorFocused: Colors[colorScheme].accent,
                colorBlurred: Colors[colorScheme].other_text
            }}
            showCountdownStyles={{
                color: Colors[colorScheme].other_text,
                fontSize: 12
            }}
            scrollEnabled={false}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}



export default Input;