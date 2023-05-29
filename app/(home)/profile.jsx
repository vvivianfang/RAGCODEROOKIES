import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => supabase.auth.signOut()}
            >
                <Button style={styles.buttonText}>Sign out</Button>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
    },
    button: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});