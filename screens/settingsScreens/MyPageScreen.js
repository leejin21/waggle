import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MyPageScreen = (props) => {
    return (
        <View>
            <Text>This is MyPageScreen</Text>
            <Button title="Go to 쿠폰함(CouponsScreen)" onPress={() => props.navigation.navigate("Coupons")}></Button>
            <Button title="Go to 정보 수정(EditInfo Screen)" onPress={() => props.navigation.navigate("EditInfo")}></Button>
            <Button title="로그아웃"></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default MyPageScreen;
