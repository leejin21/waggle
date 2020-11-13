import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { AuthContext } from "../../navigation/Navigator";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import BottomButton from "../../components/BottomButton";
import ProfileLogo from "../../components/ProfileLogo";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const LoginButton = (props) => {
    return (
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>로그인하기</Text>
        </BottomButton>
    );
};

const CompleteRegisterScreen = () => {
    const { signIn } = useContext(AuthContext);

    return (
        <View style={styles.body}>
            <View style={{...CommonStyles.body__middle, width: "100%"}}>
                <View style={styles.f2}>
                    <View style={styles.elem}>
                        <Text style={{...CommonStyles.bold_text, color: Colors.deep_yellow, fontSize: font*4.3}}>가입완료</Text>
                    </View>   
                    <Text style={{...CommonStyles.small_text, borderTopWidth: pad, fontSize: font*1.8}}>이제 와글로 멋진 식사를 즐겨보세요!</Text>
                </View>
                <View style={styles.f2}>
                    <ProfileLogo touchable={false} SIZE={font*7}></ProfileLogo>
                    <Text style={{...CommonStyles.small_text, fontSize: font*1.8}}>김눈송</Text>
                    <Text style={{...CommonStyles.small_text, fontSize: font*2.3}}>test@gmail.com</Text>
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
        paddingTop: pad*10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    body_end: {
        ...CommonStyles.body__end,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    h2: {
        margin: pad,
        textAlign: "center",
        fontFamily: "noto_bold",
        color: "white",
        fontSize: font*3.5,
    },
    text: {
        margin: pad*0.5,
        textAlign: "center",
        fontFamily: "noto_regular",
        color: "white",
        fontSize: font*1.5,
    },

    // 2 2 1
    f1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    f2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },

    elem: {
        width: "75%",
        alignItems: "center",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        paddingBottom: pad,
    },
});

export default CompleteRegisterScreen;
