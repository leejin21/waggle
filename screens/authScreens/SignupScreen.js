import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import CardTemplate from "../../templates/CardTemplate";

const SignupView = () => {
    return(
        <View>
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
        </View>
    );
}

const SignupScreen = (props) => {
    return(
        <CardTemplate 
        cardview={<SignupView></SignupView>} 
        buttonname={"가입하기"}
        toWhere={"CompleteRegister"}
        navigation={props.navigation}
        isFullcard={true}
        />
    );
}

const styles = StyleSheet.create({
    card__text: {
        fontFamily: "noto_regular",
        fontSize: 25,
        color: Colors.text_grey
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


export default SignupScreen;