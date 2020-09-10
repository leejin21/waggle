import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import Card from "../../components/Card";

const TermsNConditionsScreenops = (props) => {
    const [agreed, setAgreed] = useState(false);
    var terms_agree_style = { backgroundColor: "#FFD13B", ...styles.terms_agree_style };
    var sign_in__text = { ...styles.sign_in__text, color: "#9e9e9e" };
    var sign_in__press = () => {};
    var terms_agree__press = () => setAgreed((agreed) => true);

    if (agreed === true) {
        // console.log("agreed true");
        terms_agree_style = { backgroundColor: "#565656", ...styles.terms_agree_style };
        sign_in__text = { ...styles.sign_in__text, color: "white" };
        sign_in__press = () => props.navigation.navigate("Signup");
        terms_agree__press = () => {};
    }
    // else {
    //     console.log("agreed false");
    // }

    return (
        <View style={styles.body}>
            <Card>
                <Text style={styles.card__text}>약관</Text>
                <Text style={styles.card__text}>1항.</Text>
            </Card>
            <View style={styles.remain}>
                <TouchableOpacity style={terms_agree_style} onPress={terms_agree__press}>
                    <Text style={styles.terms_agree__text}>약관에 동의합니다</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sign_in__style} onPress={sign_in__press}>
                    <Text style={sign_in__text}>이메일로 회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const common_styles = StyleSheet.create({
    text: {
        fontFamily: "noto_bold",
    },
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 10,
        backgroundColor: "#303030",
        flex: 1,
    },

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
    terms_agree__clickable: {
        backgroundColor: "#FFD13B",
    },
    terms_agree__nonclickable: {
        backgroundColor: "#565656",
    },
    terms_agree__text: {
        ...common_styles.text,
        fontSize: 22,
        textAlign: "center",
    },
    sign_in__style: {
        backgroundColor: "#565656",
        padding: 40,
        paddingBottom: 45,
    },
    sign_in__text: {
        ...common_styles.text,
        textAlign: "center",
        fontSize: 30,
    },
});

export default TermsNConditionsScreenops;
