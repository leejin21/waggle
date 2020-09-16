// USE: all except for main:home main, settings:edit info

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const BottomButton = (props) => {
    // props: active, onPress,
    //        style_back_color(optional: in case of changing background color, ex: {backgroundColor: Colors.mid_grey})
    return props.active ? (
        <TouchableOpacity style={{ ...styles.bottom_button, ...props.style_back_color }} onPress={props.onPress}>
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
