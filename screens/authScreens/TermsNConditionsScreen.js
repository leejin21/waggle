import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import BottomButton from "../../components/BottomButton";

// TODO view 또는 touchable opacity로 바꿔주기
const TermsNConditionsScreenops = (props) => {
    const [agreed, setAgreed] = useState(false);

    // Terms_agreed button
    const Terms_agreed = () => {
        if (agreed === false) {
            // 동의 버튼 안 누른 경우: 버튼 형식
            return (
                <TouchableOpacity style={{ ...styles.terms_agree_style, ...{ backgroundColor: Colors.deep_yellow } }} onPress={() => setAgreed((agreed) => true)}>
                    <Text style={styles.terms_agree__text}>약관에 동의합니다</Text>
                </TouchableOpacity>
            );
        } else {
            // 동의 버튼 이미 누른 경우: 다시 누를 수 없게
            return (
                <View style={{ ...styles.terms_agree_style, ...{ backgroundColor: Colors.mid_grey } }} onPress={() => {}}>
                    <Text style={styles.terms_agree__text}>약관에 동의합니다</Text>
                </View>
            );
        }
    };

    // Sign_in button
    const Sign_in = (props) => {
        if (agreed === false) {
            return (
                // 동의 버튼 안 누른 경우: 회원가입 못하게
                <BottomButton active={false}>
                    <Text style={{ ...CommonStyles.bold_text, color: Colors.text_grey }}>이메일로 회원가입</Text>
                </BottomButton>
            );
        } else {
            return (
                // 동의 버튼 누른 경우: 회원가입 가능하게 버튼으로
                <BottomButton active={true} onPress={props.onPress}>
                    <Text style={{ ...CommonStyles.bold_text, color: "black" }}>이메일로 회원가입</Text>
                </BottomButton>
            );
        }
    };

    return (
        <View style={CommonStyles.body}>
            <Card>
                {/* 이 자리에는 미리 설정해둔 약관 조항들 넣어두기 */}
                <Text style={styles.card__text}>약관</Text>
                <Text style={styles.card__text}>1항.</Text>
            </Card>
            <View style={styles.remain}>
                <Terms_agreed></Terms_agreed>
                <Sign_in onPress={() => props.navigation.navigate("Signup")}></Sign_in>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card__text: {
        fontFamily: "noto_regular",
        fontSize: 25,
        color: "white",
    },
    remain: {
        flex: 2,
        marginTop: 25,
        justifyContent: "space-between",
        alignContent: "center",
    },
    terms_agree_style: {
        borderRadius: 70,
        padding: 15,
        width: "60%",
        alignSelf: "center",
    },
    terms_agree__text: {
        ...CommonStyles.bold_text,
        fontSize: 22,
    },
});

export default TermsNConditionsScreenops;
