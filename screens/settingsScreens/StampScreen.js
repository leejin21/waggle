import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import Coupon from "../../components/Coupon";

const StampScreen = (props) => {
    props.navigation.setOptions({
        ...headerOptions,
        headerTintColor: Colors.text_grey,
        headerStyle: {
            ...headerOptions.headerStyle,
            backgroundColor: Colors.mid_grey,
        },
        headerTitleStyle: {
            ...headerOptions.headerTitleStyle,
            color: "white",
        },
    });
    return (
        <View style={styles.body}>
            <Text style={styles.exp_text}>클릭시 상세 정보를 알 수 있어요.</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    // CouponsScreen comp의 styles
    body: {
        ...CommonStyles.body,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    exp_text: {
        color: "white",
        fontSize: 15,
        fontFamily: "noto_bold",
        margin: 15,
        textAlign: "center",
    },
});

export default StampScreen;
