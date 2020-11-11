// USE:: stamptocoupon screen (modal)
// from CardButton

import React from "react";
import { Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";

import Card from "../components/Card";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;

const ModalButton = (props) => {
    // props: name, collected, all, navigation
    // card -> touchablehighlight
    // collected, all -> stringify
    buttonPress = () => {
        props.toggle();
        props.navigation.navigate("Coupons");
    }

    return (
        <TouchableOpacity onPress={buttonPress}>
            <Card style={styles.card}> 
                    <Text style={styles.card__txt}>쿠폰함으로 가기</Text>
            </Card>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#161616",
        marginHorizontal: 0,
        borderRadius: pad*3,

        width: "100%",
        height: "100%",
        flex: 0,
        marginTop: 0,
        padding: pad,
        marginBottom: 0,

        alignItems: "center",
        justifyContent: "center",
    },
    card__txt: {
        color: Colors.deep_yellow,
        fontSize: windowHeight / 33,
        fontFamily: "noto_bold",
    }
});

export default ModalButton;
