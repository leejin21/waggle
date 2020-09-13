import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { setIsSignedIn } from "../../stored/SignedIn";

const LoginScreen = (props) => {
    return (
        <View>
            <Text>This is LoginScreen</Text>
            <Button title="로그인" onPress={() => setIsSignedIn("true")}></Button>
            <Button title="회원가입(Go to TermsNConditions)" onPress={() => props.navigation.navigate("TermsNC")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default LoginScreen;
