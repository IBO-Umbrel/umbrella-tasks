import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import 'react-native-reanimated';




export default function RootLayout()
{
    const colorScheme = useColorScheme() ?? "light";
    const [font_loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });


    if (!font_loaded)
    {
        return null;
    }
    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            {/* <Stack/> */}
            <Stack
                // initialRouteName="(tabs)"
                screenOptions={{
                    headerShown: false,
                    navigationBarHidden: true,
                }}
            >
                <Stack.Screen
                    name="tasks"
                />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
