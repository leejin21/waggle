import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import ProfileLogo from "../../components/ProfileLogo";
import { headerOptions } from "../../constants/Options";

const MyPageScreen = (props) => {
    props.navigation.setOptions({
        headerBackTitleVisible: false,
        headerTitle: (props) => <Image style={{ width: 160, height: 80 }} source={require("../../assets/images/logo.png")} resizeMode="contain"></Image>,
        headerTitleStyle: {
            flex: 1,
            textAlign: "center",
        },
        headerStyle: {
            ...headerOptions.headerStyle,
            backgroundColor: Colors.body_grey,
        },
    });
    return (
        <View>
            <Text>This is MyPageScreen</Text>
            <Text>Why not work</Text>
            <ProfileLogo touchable={false} SIZE={80}></ProfileLogo>

            <Button title="Go to 쿠폰함(CouponsScreen)" onPress={() => props.navigation.navigate("Coupons")}></Button>
            <Button title="Go to 정보 수정(EditInfo Screen)" onPress={() => props.navigation.navigate("EditInfo")}></Button>
            <Button title="로그아웃"></Button>
        </View>
    );
};
const styles = StyleSheet.create({});

export default MyPageScreen;
