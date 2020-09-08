import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const FinishOrderScreen = (props) => {
    return (
        <View>
            <Text>This is FinishOrder screen</Text>
            <Button title="홈으로 가기(Go to HomeMainScreen)" onPress={() => props.navigation.navigate("HomeMain")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default FinishOrderScreen;
