// _layout.tsx (Root Layout)
// Sets up the app's core structure, navigation, and providers.
import { TaskDetailProvider } from "@/components/TaskDetailProvider";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import 'react-native-reanimated';




export default function RootLayout()
{
    const router = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    // Load custom font (SpaceMono) for consistent typography.
    const [font_loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    // Redirect to the "All Tasks" screen on app load.
    useEffect(() =>
    {
        const timeout = setTimeout(() => router.navigate("/tasks/all"), 0);

        return () => clearTimeout(timeout);
    }, []);

    // Wait for fonts to load before rendering the app.
    if (!font_loaded)
    {
        return null;
    }
    return (
        // Applies light or dark theme based on device settings.
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <KeyboardProvider>
                <TaskDetailProvider>
                    <Stack
                        screenOptions={{
                            // headerShown: false,
                            navigationBarHidden: true,
                            headerShadowVisible: false,
                            // Displays app icon in the header.
                            headerLeft()
                            {
                                return (
                                    <Image
                                        width={40}
                                        height={40}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            marginRight: 10
                                        }}
                                        source={require("@/assets/images/icon.png")}
                                    />
                                );
                            }
                        }}
                    >
                        <Stack.Screen
                            name="tasks"
                            options={{
                                title: "Umbrella Tasks"
                            }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </TaskDetailProvider>
            </KeyboardProvider>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
