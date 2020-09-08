import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CompleteRegisterScreen = (props) => {
    return (
        <View>
            <Text>This is CompleteRegisterScreen</Text>
            <Button title="로그인하기(Go back to LogIn Screen)" onPress={() => props.navigation.navigate("Login")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default CompleteRegisterScreen;
