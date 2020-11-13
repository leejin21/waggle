// 로그인 post request => 로그인해서 token 받기

import React, { useState, useContext } from "react";
import { View, Text, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { AuthContext } from "../../navigation/Navigator";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import ButtomButton from "../../components/BottomButton";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;


const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const { signIn } = useContext(AuthContext);

    return (
        <View style={CommonStyles.body}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={CommonStyles.body__middle}>
                    <View style={styles.text_input__wrapper}>
                        <Text style={styles.text_input__text}>ID</Text>
                        <TextInput style={CommonStyles.grey_button} placeholder="이메일을 적어주세요." placeholderTextColor={Colors.text_grey} onChangeText={(email) => setEmail(email)} defaultValue={email} />
                    </View>
                    <View style={styles.text_input__wrapper}>
                        <Text style={{ ...styles.text_input__text, marginLeft: pad*1.5 }}>PW</Text>
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
                    <TouchableOpacity onPress={() => signIn({ email, pw })} style={styles.login__button}>
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
        margin: pad*1.5,
    },

    text_input__text: {
        fontFamily: "noto_bold",
        fontSize: pad*1.8,
        marginLeft: pad*2,
        marginBottom: pad*0.5,
        color: "white",
    },
    login__button: {
        ...CommonStyles.grey_button,
        marginTop: pad*3,
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: 9 / 4
    },
    login__text: {
        fontFamily: "noto_bold",
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: pad*1.7,
        color: "white",
    },
});

export default LoginScreen;
