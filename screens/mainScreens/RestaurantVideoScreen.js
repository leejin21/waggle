import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RestaurantVideoScreen = (props) => {
    return (
        <View styles={styles.container}>
            <Text>This is RestaurantVideoScreen</Text>
            <Button title="메뉴 선택(BasketScreen)" onPress={() => props.navigation.navigate("Basket")}></Button>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default RestaurantVideoScreen;
