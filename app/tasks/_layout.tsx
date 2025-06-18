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
            // initialRouteName="all"
            screenOptions={{
                sceneStyle:
                {
                    backgroundColor: Colors[colorScheme].background
                },
                tabBarActiveTintColor: Colors[colorScheme].text,
                tabBarIndicatorStyle:
                {
                    backgroundColor: Colors[colorScheme].accent
                },
                // swipeEnabled: false
            }}
        >
            <TopTabs.Screen
                name="all"
                options={{ title: "All" }}
            />
            <TopTabs.Screen
                name="in-progress"
                options={{ title: "In Progress" }}
            />
        </TopTabs>
    );
}