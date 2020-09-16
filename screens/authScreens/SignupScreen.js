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

const SignupButton = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>가입하기</Text>
        </BottomButton>
    );
};

const SignUpScreen = (props) => {   
    return (
        <View style={styles.container}>
            <View style={styles.top}><Text style={styles.text}>정보입력</Text></View>
            <View style={styles.mid}>
                <View style={styles.elem}>
                    <Text style={styles.text}>이름</Text>
                    <TextInput textContentType="name" returnKeyType="next" style={styles.textinput}/>
                </View>
                <View style={styles.elem}>
                    <Text style={styles.text}>이메일</Text>
                    <TextInput textContentType="emailAddress" keyboardType="email-address" returnKeyType="next" style={styles.textinput}/>
                </View>
                <View style={styles.elem}>
                    <Text style={styles.text}>비밀번호</Text>
                    <TextInput textContentType="newPassword" returnKeyType="next" secureTextEntry={true} style={styles.textinput}/>
                </View>
                <View style={styles.elem}>
                    <Text style={styles.text}>연락처</Text>
                    <TextInput textContentType="telephoneNumber" keyboardType="number-pad" returnKeyType="done" style={styles.textinput}/>
                </View>
    
            </View>
            <View style={styles.bottom}><SignupButton onPress={() => props.navigation.navigate("CompleteRegister")}/></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    top: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mid: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        top: -80
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    elem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 7,
        padding: 5
    },

    button: {
        width: "100%",
        height: 110,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: 0
    },
    touched: {
        backgroundColor: "#ee5555"
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    textinput: { 
        height: 40, 
        width: 300, 
        color: "white",
        borderColor: 'orange', 
        borderWidth: 1 }
});

export default SignUpScreen;
