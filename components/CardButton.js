// USE:: settings screens: stampboxscreen

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";
import { headerOptions } from "../constants/Options";

import Card from "../components/Card";
import { FlatList, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

const Coupon = (props) => {
    // props: usable, name, content, useDate, ICON_SIZE
    const [usable, setUsable] = useState(props.usable);
    const [removed, setRemoved] = useState(false);
    // TODO removed=== true일때, View로 처리하고 화면에서 나가거나 할 때(일단 이 경우로 removed를 고려하겠음) fetch해서 바꾸도록 할 지, 아니면 그 자리에서 바로 fetch할 지

    return removed ? (
        <View></View>
    ) : (
        <Card style={styles.card}>
            <View style={styles.card__title}>
                <Text style={styles.card__title__txt}>{props.name}</Text>
                <TouchableHighlight
                    style={{ width: props.ICON_SIZE, height: props.ICON_SIZE, borderRadius: props.ICON_SIZE }}
                    underlayColor={Colors.body_grey}
                    onPress={() => {
                        setRemoved((removed) => true);
                    }}
                >
                    <MaterialIcons name="cancel" size={props.ICON_SIZE} color={Colors.text_grey} />
                </TouchableHighlight>
            </View>
            <View style={styles.card__title__border}></View>
            <View style={styles.card__body}>
                <Text style={styles.card__body__txt}>{props.content}</Text>
            </View>
            {usable ? (
                <TouchableOpacity style={styles.card__button} onPress={() => setUsable((usable) => false)}>
                    <Text style={{ ...styles.card__button__txt, color: "black" }}>사이드메뉴 무료증정권 사용하기</Text>
                    <Text style={{ ...styles.card__button__date, color: "black" }}>{"~ " + props.useDate}</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ ...styles.card__button, backgroundColor: "black" }}>
                    <Text style={styles.card__button__txt}>사용완료</Text>
                    <Text style={styles.card__button__date}>{props.useDate}</Text>
                </View>
            )}
        </Card>
    );
};
const styles = StyleSheet.create({
    // Coupon comp의 styles
    // TODO 핸드폰 dimenstion size에 따라 달라질 수 있으므로 비율로 margin, padding 다 조정하기(b/c card__button)
    card: {
        width: "95%",
        flex: 0,
        marginTop: 10,
        padding: 10,
        marginBottom: 10,
    },
    card__title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card__title__txt: {
        ...CommonStyles.bold_text,
        fontSize: 27,
        paddingTop: 20,
        color: Colors.deep_yellow,
        flex: 1,
        paddingLeft: 50,
    },
    card__title__border: {
        marginTop: 20,
        marginHorizontal: 30,
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
    card__body: {
        marginHorizontal: 30,
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    card__body__txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: 18,
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

export default Coupon;
