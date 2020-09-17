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
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>수정완료</Text>
        </BottomButton>
    );
};

const EditInfoScreen = (props) => {   
    return (
        <View style={CommonStyles.body}>
            <View style={CommonStyles.body__middle}>
                <Card>
                    <View style={styles.elem}>
                        <Text style={styles.card__text}>이름</Text>
                        <TextInput textContentType="name" returnKeyType="next" style={styles.textinput}/>
                    </View>
                    <View style={styles.elem}>
                        <Text style={styles.card__text}>이메일</Text>
                        <TextInput textContentType="emailAddress" keyboardType="email-address" returnKeyType="next" style={styles.textinput}/>
                    </View>
                    <View style={styles.elem}>
                        <Text style={styles.card__text}>비밀번호</Text>
                        <TextInput textContentType="newPassword" returnKeyType="next" secureTextEntry={true} style={styles.textinput}/>
                    </View>
                    <View style={styles.elem}>
                        <Text style={styles.card__text}>연락처</Text>
                        <TextInput textContentType="telephoneNumber" keyboardType="number-pad" returnKeyType="done" style={styles.textinput}/>
                    </View>
                </Card>
            </View>
            <View style={CommonStyles.body__end}><EditInfoButton onPress={() => props.navigation.navigate("HomeMain")}/></View>
        </View>
    );
};

const styles = StyleSheet.create({
    card__text: {
        fontFamily: "noto_regular",
        fontSize: 25,
        color: Colors.text_grey
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
        padding: 6
    },

    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    textinput: { 
        height: 40, 
        width: 210, 
        color: "white",
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: 25 
    }
});

export default EditInfoScreen;