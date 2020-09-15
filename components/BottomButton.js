import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const BottomButton = (props) => {
    // props: yellow, onPress
    return props.yellow ? (
        <TouchableOpacity style={styles.bottom_button} onPress={props.onPress}>
            {props.children}
        </TouchableOpacity>
    ) : (
        <View style={{ ...styles.bottom_button, backgroundColor: Colors.mid_grey }}>{props.children}</View>
    );
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

export default BottomButton;
