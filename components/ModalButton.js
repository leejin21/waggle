// USE:: stamptocoupon screen (modal)
// from CardButton

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";

import Card from "../components/Card";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const ModalButton = (props) => {
    // props: name, collected, all, navigation
    // card -> touchablehighlight
    // collected, all -> stringify
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("StampCoupon", {title: props.name, fullstampNum: props.all, laststampNum: props.collected})}>
            <Card style={styles.card}> 
                    <Text style={styles.card__txt}>쿠폰함으로 가기</Text>
            </Card>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    // TODO 핸드폰 dimenstion size에 따라 달라질 수 있으므로 비율로 margin, padding 다 조정하기(b/c card__button)
    card: {
        backgroundColor: "#161616",
        marginHorizontal: 10,
        borderRadius: 40,

        width: "95%",
        flex: 0,
        marginTop: 10,
        padding: 10,
        marginBottom: 10,

        alignItems: "center",
        justifyContent: "center",
    },
    card__txt: {
        color: Colors.deep_yellow,
        fontSize: 25,
        fontFamily: "noto_bold",
    }
});

export default ModalButton;
