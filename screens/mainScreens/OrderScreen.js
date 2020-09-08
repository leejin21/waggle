import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const OrderScreen = (props) => {
    return (
        <View>
            <Text>This is OrderScreen</Text>
            <Button title="주문하기(Go to Finish Order Screen)" onPress={() => props.navigation.navigate("FinishOrder")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default OrderScreen;
