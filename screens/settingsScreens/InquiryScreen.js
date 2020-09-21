// 일단 그냥 SignupScreen 카피 수준

import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import BottomButton from "../../components/BottomButton";

/*
import DatePicker from "react-native-date-picker";
import CheckBox from "@react-native-community/checkbox";
*/

const EditInfoButton = (props) => {
    return (
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>전송하기</Text>
        </BottomButton>
    );
};

const InquiryScreen = (props) => {
    return (
        <View style={CommonStyles.body}>
            <View style={CommonStyles.body__middle}>
                <Card>
                    <Text> 문의하기 화면 </Text>
                </Card>
            </View>
            <View style={CommonStyles.body__end}>
                <EditInfoButton onPress={() => props.navigation.navigate("HomeMain")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card__text: {
        fontFamily: "noto_regular",
        fontSize: 25,
        color: Colors.text_grey,
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

    elem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: Colors.text_grey,
        padding: 6,
    },

    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    textinput: {
        height: 40,
        width: 210,
        color: "white",
        borderColor: "transparent",
        borderWidth: 1,
        fontSize: 25,
    },
});

export default InquiryScreen;
