import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import { Link } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const handleSubmit = async () => {
        setErrMsg('');
        if (email == '') {
            setErrMsg("Email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.button}
            behavior="padding"
        >
            <View>
                <Text style = {styles.title}>rookieshoppers</Text>
            </View>
            <View style={styles.inputContainer}>

                <Text>Email</Text>
                <TextInput
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={setEmail}
                    style = {styles.input} />
                <Text>Password</Text>
                <TextInput
                    secureTextEntry
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={setPassword}
                    style = {styles.input} />
                <Button onPress={handleSubmit} style={styles.loginButton}>Login</Button>
                {errMsg !== "" && <Text>{errMsg}</Text>}
                {loading && <ActivityIndicator />}
                <Link href="/register">
                    <Button style={styles.registerButton}>Register here</Button>
                </Link>
            </View>
        </KeyboardAvoidingView>   
    )
}

const styles = StyleSheet.create({
    title: {
        height: 60,
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: 'white',
        textShadowColor: '#1853A3',
        textShadowOffset: {width: 1, height: 5},
        textShadowRadius: 13,
        paddingTop: 5,
        marginTop: 50,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    },
    inputContainer: {
        backgroundColor: 'pink',
        flex: 1, 
        justifyContent: 'center',
    },
    registerButton: {
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    }, 
    loginButton: {
        marginTop: 20, 
        padding: 10,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    }
}) 