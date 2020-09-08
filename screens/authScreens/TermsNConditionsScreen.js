import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const TermsNConditionsScreenops = (props) => {
    return (
        <View>
            <Text>This is TermsNConditionsScreen</Text>
            <Button title="약관에 동의합니다"></Button>
            <Button title="이메일로 회원가입" onPress={() => props.navigation.navigate("Signup")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default TermsNConditionsScreenops;
