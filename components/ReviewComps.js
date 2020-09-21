// USE: all except for main:home main, settings:edit info

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Pick = (props) => {
    return (
        <View style={styles.pick__wrapper}>
            <Text style={styles.pick__text}>눈송</Text>
            <Text style={{ ...styles.pick__text, color: "white" }}>'s PICK</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pick__wrapper: {
        backgroundColor: Colors.black_grey,
        borderRadius: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingTop: 7,
        paddingHorizontal: 10,
        width: "50%",
        marginTop: -38,
    },
    pick__text: {
        color: Colors.deep_yellow,
        fontSize: 20,
        fontFamily: "noto_bold",
    },
});

export { Pick };
