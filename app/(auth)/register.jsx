import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { View } from "react-native";
import { Text, TextInput, ActivityIndicator, Button } from 'react-native-paper';
import { StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async () => {
        if (email == '') {
            setErrMsg("Email cannot be empty!")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty!")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputButton}>
                <Text>Email</Text>
                <TextInput
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail} />
                <Text>Password</Text>
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword} />
                <Button onPress={handleSubmit}>Submit</Button>
                {errMsg !== "" && <Text>{errMsg}</Text>}
                {loading && <ActivityIndicator />}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    inputButton: {
        backgroundColor: 'pink',
        flex: 1, 
        justifyContent: 'center',
    },
})