import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import BottomButton from "../../components/BottomButton";

const LoginButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}>  
            <Text style={styles.text}>로그인하기</Text>
        </TouchableOpacity>
    );
};

const CompleteRegisterScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.text}>가입완료</Text>
                <Text style={styles.text}>이제 와글로 멋진 식사를 즐겨보세요!</Text>
            </View>
            <View style={styles.mid}>
                <Text style={styles.text}>김눈송</Text>
                <Text style={styles.text}>test@gmail.com</Text>
                {/* 정보 받아와서 내용 수정되게끔 고쳐야 */}
            </View>
            <View style={styles.bottom}><LoginButton navigation={props.navigation}/></View>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default CompleteRegisterScreen;
