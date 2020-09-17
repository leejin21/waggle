import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { AuthContext } from "../../navigation/WaggleNavigator";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import BottomButton from "../../components/BottomButton";
import ProfileLogo from "../../components/ProfileLogo";

const LoginButton = (props) => {
    return (
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>로그인하기</Text>
        </BottomButton>
    );
};

const CompleteRegisterScreen = (props) => {
    const { signIn } = useContext(AuthContext);

    return (
        <View style={styles.body}>
            <View style={CommonStyles.body__middle}>
                <View style={styles.f2}>
                    <Text style={styles.h2}>가입완료</Text>
                    <Text style={styles.text}>이제 와글로 멋진 식사를 즐겨보세요!</Text>
                </View>
                <View style={styles.f2}>
                    <Text style={styles.text}>김눈송</Text>
                    <Text style={styles.text}>test@gmail.com</Text>
                    {/* 정보 받아와서 내용 수정되게끔 고쳐야 */}
                </View>
                <View style={styles.f1}></View>
            </View>
            <View style={styles.body_end}>
                <LoginButton onPress={() => signIn({})} />
                {/* <LoginButton onPress={() => props.navigation.navigate("Login")} /> */}
            </View>
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
    body_end: {
        ...CommonStyles.body__end,
        width: "100%",
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

    // 2 2 1
    f1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    f2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default CompleteRegisterScreen;
