import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import Coupon, { StampCoupon } from "../../components/Coupon";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const couponDatas = [
    // SERVER TODO usable이 true면 reviewd는 무조건 false로, useDate는 usable에 false 업데이트할 때마다 업데이트.
    { name: "ABC레스토랑", type: "G", content: "A, E and A", usable: true, review_able: true, useDate: "2020.08.26 12:53 PM" },
    { name: "가나다 레스토랑", type: "S", content: "(메뉴이름)", usable: true, useDate: "2020.09.29 18:00 PM" },
    { name: "가나다식당", type: "G", content: "ㄱ, ㄴ 그리고 ㄷ", usable: false, review_able: true, useDate: "2020.09.16 22:01 PM" },
    { name: "로제찜닭", type: "G", content: "찜닭 그리고 계란찜", usable: false, review_able: false, useDate: "2020.07.28 14:05 PM" },
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
            <View style={styles.exp_text__wrapper}>
                <Text style={styles.exp_text}>실수로 사이드메뉴 증정권 버튼을 눌렀을 시,{"\n"}X를 눌러 주문 취소 후 다시 주문해 주세요.</Text>
                <Text style={{ ...styles.exp_text, color: Colors.deep_yellow }}>단, 스탬프 완료 쿠폰은 다시 발급이 불가합니다.</Text>
            </View>
            <FlatList
                key="_"
                data={couponDatas}
                renderItem={({ item }) => {
                    if (item.type === "S") {
                        return <StampCoupon name={item.name} content={item.content} usable={item.usable} useDate={item.useDate} ICON_SIZE={font*5}></StampCoupon>;
                    } else {
                        return (
                            <Coupon
                                name={item.name}
                                content={item.content}
                                usable={item.usable}
                                review_able={item.review_able}
                                useDate={item.useDate}
                                ICON_SIZE={font*5}
                                navigation={props.navigation}
                            ></Coupon>
                        );
                    }
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
        width: "100%",
    },
    exp_text__wrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: pad*1.5,
    },
    exp_text: {
        color: "white",
        fontSize: font*1.6,
        fontFamily: "noto_bold",
        textAlign: "center",
    },
});

export default CouponsScreen;
