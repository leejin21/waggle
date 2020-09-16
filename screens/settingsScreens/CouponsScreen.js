import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import Coupon from "../../components/Coupon";

const couponDatas = [
    { name: "ABC레스토랑", content: "A, E and A", usable: true, useDate: "2020.08.26 12:53 PM" },
    { name: "가나다식당", content: "ㄱ, ㄴ 그리고 ㄷ", usable: false, useDate: "2020.09.16 22:01 PM" },
    { name: "로제찜닭", content: "찜닭 그리고 계란찜", usable: false, useDate: "2020.07.28 14:05 PM" },
];

const CouponsScreen = (props) => {
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
            <Text style={styles.exp_text}>실수로 사이드메뉴 증정권 버튼을 눌렀을 시,{"\n"}X를 눌러 주문 취소 후 다시 주문해 주세요.</Text>
            <FlatList
                key="_"
                data={couponDatas}
                renderItem={({ item }) => {
                    return <Coupon name={item.name} content={item.content} usable={item.usable} useDate={item.useDate} ICON_SIZE={50}></Coupon>;
                }}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: "100%" }}
            ></FlatList>
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

export default CouponsScreen;
