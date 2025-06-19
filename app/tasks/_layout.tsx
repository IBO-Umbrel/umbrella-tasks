import { Colors } from "@/constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useColorScheme } from "react-native";


const { Navigator } = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Navigator);


export default function TasksLayout()
{
    const colorScheme = useColorScheme() ?? "light";
    return (
        <TopTabs
            screenOptions={{
                sceneStyle:
                {
                    backgroundColor: Colors[colorScheme].background,
                    borderTopWidth: 1,
                    borderColor: Colors[colorScheme].border
                },
                tabBarActiveTintColor: Colors[colorScheme].text,
                tabBarIndicatorStyle:
                {
                    backgroundColor: Colors[colorScheme].accent
                },
                tabBarInactiveTintColor: Colors[colorScheme].other_text,
                tabBarScrollEnabled: true
                // swipeEnabled: false
            }}
        >
            <TopTabs.Screen
                name="all"
                options={{ title: "All" }}
            />
            <TopTabs.Screen
                name="pending"
                options={{ title: "Pending" }}
            />
            <TopTabs.Screen
                name="in-progress"
                options={{ title: "In Progress" }}
            />
            <TopTabs.Screen
                name="completed"
                options={{ title: "Completed" }}
            />
            <TopTabs.Screen
                name="canceled"
                options={{ title: "Canceled" }}
            />
        </TopTabs>
    );
}