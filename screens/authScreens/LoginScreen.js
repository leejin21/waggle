import React, { useState } from "react";
import { View, Text, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from "react-native";
import { setIsSignedIn } from "../../stored/SignedIn";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import ButtomButton from "../../components/BottomButton";

const LoginScreen = (props) => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    return (
        <View style={CommonStyles.body}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={CommonStyles.body__middle}>
                    {/* <Text_input what="ID" onChangeText={(id) => setId(id)} value={id} placeholder="이메일을 적어주세요!"></Text_input> */}
                    <View style={styles.text_input__wrapper}>
                        <Text style={styles.text_input__text}>ID</Text>
                        <TextInput style={CommonStyles.grey_button} placeholder="이메일을 적어주세요." placeholderTextColor={Colors.text_grey} onChangeText={(id) => setId(id)} defaultValue={id} />
                    </View>
                    <View style={styles.text_input__wrapper}>
                        <Text style={{ ...styles.text_input__text, marginLeft: 15 }}>PW</Text>
                        <TextInput
                            style={CommonStyles.grey_button}
                            placeholder="비밀번호를 적어주세요."
                            placeholderTextColor={Colors.text_grey}
                            onChangeText={(pw) => setPw(pw)}
                            defaultValue={pw}
                            secureTextEntry
                        ></TextInput>
                    </View>
                    {/* submit 할 때 데이터 leak 안하도록.. */}
                    <TouchableOpacity onPress={() => setIsSignedIn("true")} style={styles.login__button}>
                        <Text style={styles.login__text}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

            <View style={CommonStyles.body__end}>
                <ButtomButton active={true} onPress={() => props.navigation.navigate("TermsNC")}>
                    <Text style={{ ...CommonStyles.bold_text }}>회원가입</Text>
                </ButtomButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    text_input__wrapper: {
        margin: 15,
    },

    text_input__text: {
        fontFamily: "noto_bold",
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 5,
        color: "white",
    },
    login__button: {
        ...CommonStyles.grey_button,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 130,
    },
    login__text: {
        fontFamily: "noto_bold",
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 17,
        color: "white",
    },
});

export default LoginScreen;
