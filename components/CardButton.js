// USE:: settings screens: stampboxscreen

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";

import Card from "../components/Card";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const CardButton = (props) => {
    // props: name, collected, all, navigation
    // card -> touchablehighlight
    // collected, all -> stringify
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("StampCoupon", {title: props.name})}>
            <Card style={styles.card}> 
                <View style={styles.card__title}>
                    <Text style={styles.card__title__txt}>{props.name}</Text>
                </View>

                <View style={styles.card__body}>
                    <Text style={styles.card__body__txt}>{props.collected + ' / ' + props.all}</Text>
                </View>
            </Card>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    // TODO 핸드폰 dimenstion size에 따라 달라질 수 있으므로 비율로 margin, padding 다 조정하기(b/c card__button)
    card: {
        backgroundColor: "#565656",
        marginHorizontal: 10,
        borderRadius: 40,

        width: "95%",
        flex: 0,
        marginTop: 10,
        padding: 10,
        marginBottom: 10,

        flexDirection: "row"
    },
    card__title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card__title__txt: {
        ...CommonStyles.bold_text,
        fontSize: 22,
        color: Colors.deep_yellow,
        paddingLeft: 15
    },
    card__title__border: {
        marginTop: 20,
        marginHorizontal: 30,
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
    card__body: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "93%",
    },
    card__body__txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: 20,
        fontFamily: "noto_bold",
    },
    card__button: {
        ...CommonStyles.grey_button,
        marginHorizontal: 20,
        height: 70,
        backgroundColor: Colors.deep_yellow,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        padding: 20,
    },

    card__button__txt: {
        color: Colors.text_grey,
        fontSize: 21,
        fontFamily: "noto_bold",
    },
    card__button__date: {
        color: Colors.text_grey,
        fontSize: 15,
        fontFamily: "noto_regular",
    },
});

export default CardButton;
