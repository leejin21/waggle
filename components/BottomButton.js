// USE: all except for main:home main, settings:edit info

import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 23;

const BottomButton = (props) => {
    // props: active, onPress,
    //        style_back_color(optional: in case of changing background color, ex: {backgroundColor: Colors.mid_grey})
    return props.active ? (
        <TouchableOpacity style={{ ...styles.bottom_button, ...props.style_back_color }} onPress={props.onPress}>
            {props.children}
        </TouchableOpacity>
    ) : (
        <View style={{ ...styles.bottom_button, backgroundColor: Colors.mid_grey, ...props.style_back_color }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    bottom_button: {
        backgroundColor: Colors.deep_yellow,
        padding: pad,
        paddingBottom: pad,
        width: "100%",
    },
});

export default BottomButton;
