import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { TextInput } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import CardTemplate from "../../templates/CardTemplate";
import ProfileLogo from "../../components/ProfileLogo";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const SignupView = () => {
    return(
        <View>
            <View style={{width: "100%", justifyContent: "center", alignItems: "center", paddingBottom: pad*2.3}}>
                <ProfileLogo touchable={false} SIZE={font*7}></ProfileLogo>
            </View>

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
            <View style={styles.elem}>
                <Text style={styles.card__text}>생년월일</Text>
                <TextInput style={styles.textinput}/>
            </View>
            <View style={styles.elem}>
                <Text style={styles.card__text}>성별</Text>
                <TextInput style={styles.textinput}/>
            </View>

            <View style={{width: "100%", justifyContent: "center", alignItems: "center", paddingTop: pad*1.3}}>
                <Text style={{...CommonStyles.small_text, fontSize: font*1.8, color: Colors.deep_yellow, fontFamily: "noto_bold"}}>할인권발매를 위해 위의 정보를 입력해주세요</Text>
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
        fontSize: font*2.5,
        color: Colors.text_grey
    },

    elem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: pad*0.2,
        borderBottomColor: Colors.text_grey,
        padding: pad*0.6
    },

    text: {
        color: "white",
        fontSize: font*2,
        fontWeight: "bold"
    },
    textinput: { 
        height: font*4, 
        width: font*21, 
        color: "white",
        borderColor: 'transparent',
        borderWidth: 1,
        fontSize: font*2.5
    }
});


export default SignupScreen;