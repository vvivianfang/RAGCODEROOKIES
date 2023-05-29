import { Tabs } from "expo-router";

export default function HomeScreen() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Shopping List" }} />
            <Tabs.Screen name="newTodo" options={{ title: "New Item" }} />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}
