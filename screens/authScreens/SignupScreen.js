import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SignUpScreen = (props) => {
    return (
        <View>
            <Text>This is SignUpScreen</Text>
            <Button title="가입하기(Go to CompleteRegisterScreen)" onPress={() => props.navigation.navigate("CompleteRegister")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default SignUpScreen;
