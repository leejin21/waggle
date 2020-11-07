// USE:: auth screens: register, terms and conditions
//    :: settings screens: coupon, edit info
import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
    // props: style

    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#565656",
        flex: 3,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 40,
        padding: 25,
    },
});

export default Card;
