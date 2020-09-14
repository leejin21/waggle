import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// TODO 제대로 정리하기: in login screen and buttom button
const ButtomButton = (props) => {
    return <View style={styles.ButtomButton}>{props.children}</View>;
};

const styles = StyleSheet.create({
    bottom_button: {
        backgroundColor: Colors.deep_yellow,
        padding: 40,
        paddingBottom: 45,
        width: "100%",
        // fontFamily: "noto_bold",
    },
});

export default ButtomButton;
