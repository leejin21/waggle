import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import CommonStyles from "../../constants/CommonStyles";
import CheckCircle from "../../components/CheckCircle";

import BottomButton from "../../components/BottomButton";

const FinishOrderScreen = (props) => {
    return (
        <View style={styles.body}>
            <View style={CommonStyles.body__middle}>
                <CheckCircle SIZE={200} touchable={false}></CheckCircle>
                <Text style={styles.h2}>주문 완료</Text>
                <Text style={styles.text}>사이드 메뉴는 [마이페이지]-[쿠폰함]에 지금되었어요!{"\n"} 식당에 방문하여 쿠폰을 제시해주세요.</Text>
            </View>
            <View style={CommonStyles.body__end}></View>
            <BottomButton active={true} onPress={() => props.navigation.navigate("HomeMain")}>
                <Text style={CommonStyles.bold_text}>홈으로 가기</Text>
            </BottomButton>
        </View>
    );
};
const styles = StyleSheet.create({
    body: {
        ...CommonStyles.body,
        paddingTop: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    h2: {
        margin: 10,
        textAlign: "center",
        fontFamily: "noto_bold",
        color: "white",
        fontSize: 35,
    },
    text: {
        margin: 5,
        textAlign: "center",
        fontFamily: "noto_regular",
        color: "white",
        fontSize: 15,
    },
});

export default FinishOrderScreen;
