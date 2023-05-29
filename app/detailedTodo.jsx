import { Link, useSearchParams } from "expo-router";
import { View, Image } from "react-native";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export default function EditTodoPage() {
    const { id } = useSearchParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        console.log(`id before if: ${id}`)
        if (id != null) {
            const fetchTodo = async () => {
                console.log(`id: ${id}`);
                const { data } = await supabase.from('todos').select('*').eq('id', id).single();
                console.log(data);
                setTodo(data);
            }
            fetchTodo();
        }
    }, [id])
    if (todo == null) {
        return <ActivityIndicator />
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{todo.task}</Text>
            {todo.image_url && <Image source={{ uri: todo.image_url }} style={{ height: 200, width: 200 }} />}
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: 'blue',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'black'
                }}
                onPress={() => { /* handle onPress event */ }}
            >
                <Link style={{ color: 'white', fontWeight: 'bold' }} href="/">Return</Link>
            </TouchableOpacity>
        </View>
    )
}