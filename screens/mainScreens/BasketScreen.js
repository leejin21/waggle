import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const BasketScreen = (props) => {
    return (
        <View>
            <Text>This is BasketScreen</Text>
            <Button title="메뉴 담기(OrderScreen)" onPress={() => props.navigation.navigate("Order")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default BasketScreen;
