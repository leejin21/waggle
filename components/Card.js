// USE:: auth screens: register, terms and conditions
//    :: settings screens: coupon, edit info
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 60; //10

const Card = (props) => {
    // props: style

    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#565656",
        flex: 3,
        marginTop: pad,
        marginHorizontal: pad,
        borderRadius: pad*2.7,
        padding: pad*2,
    },
});

export default Card;
