import Colors from "./Colors";
import React from "react";
import { Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const headerOptions = {
    headerTintColor: "white",
    headerBackTitleVisible: false,

    headerStyle: {
        backgroundColor: "black",
        // width: windowWidth,
        height: windowWidth * (5/16),
        
        // 밑에 줄 그인 거 없애기 위함
        shadowColor: "transparent",
    },
    headerTitleStyle: {
        fontSize: font*3,
        fontFamily: "noto_bold",
    },
};

const logoHeaderOptions = {
    headerBackTitleVisible: false,
    headerTitle: (props) => <Image style={{ width: font*16, height: font*8 }} source={require("../assets/images/logo.png")} resizeMode="contain"></Image>,
    headerTitleStyle: {
        flex: 1,
        textAlign: "center",
    },
    headerStyle: {
        ...headerOptions.headerStyle,
        backgroundColor: Colors.body_grey,
    },
};

const reviewOptions = {
    ...headerOptions,
    headerTintColor: Colors.text_grey,
    headerStyle: {
        ...headerOptions.headerStyle,
        backgroundColor: Colors.mid_grey,
    },
    headerTitleStyle: {
        ...headerOptions.headerTitleStyle,
        color: Colors.deep_yellow,
    },
};

export { headerOptions, logoHeaderOptions, reviewOptions };
