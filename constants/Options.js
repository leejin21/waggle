import Colors from "./Colors";
import React from "react";
import { Image } from "react-native";

const headerOptions = {
    headerTintColor: "white",
    headerBackTitleVisible: false,

    headerStyle: {
        backgroundColor: "black",
        height: 150,
        // 밑에 줄 그인 거 없애기 위함
        shadowColor: "transparent",
    },
    headerTitleStyle: {
        fontSize: 30,
        fontFamily: "noto_bold",
    },
};

const logoHeaderOptions = {
    headerBackTitleVisible: false,
    headerTitle: (props) => <Image style={{ width: 160, height: 80 }} source={require("../assets/images/logo.png")} resizeMode="contain"></Image>,
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
