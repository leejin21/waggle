import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RotationGestureHandler, TouchableOpacity } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";

import { HeartIcon } from "../../components/ListPhoto";
import { Feather } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import CommonStyles from "../../constants/CommonStyles";

const ICON_SIZE = 24;

const HeaderRight = (props) => {
    return (
        <View style={styles.header__right}>
            <HeartIcon heart_filled={true} style={styles.heart_icon}></HeartIcon>
            <TouchableOpacity style={styles.more_icon} onPress={() => {}}>
                <Feather name="more-vertical" size={ICON_SIZE} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const RestaurantVideoScreen = (props) => {
    props.navigation.setOptions({
        ...headerOptions,
        headerTintColor: Colors.deep_yellow,
        headerTransparent: true,
        headerStyle: {
            height: 150,
            shadowColor: "transparent",
        },
        headerTitleStyle: {
            ...headerOptions.headerTitleStyle,
            color: "white",
        },

        // SECTION set header title and header right buttons
        title: props.route.params.title,
        headerRight: () => <HeaderRight></HeaderRight>,
    });

    return (
        <View style={styles.container}>
            <View style={styles.video__wrapper}>
                {/* TODO video component: fetch from the server */}
                <Text style={{ color: "white" }}>VIDEO PART</Text>
            </View>
            <View style={styles.button__wrapper}>
                <BottomButton active={true} onPress={() => props.navigation.navigate("Basket", {title: props.route.params.title})}>
                    <Text style={CommonStyles.bold_text}>메뉴 선택</Text>
                </BottomButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    video__wrapper: {
        flex: 13,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.body_grey,
        width: "100%",
    },
    button__wrapper: {
        flex: 2,
        width: "100%",
    },
    header__right: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
    },
    heart_icon: {
        margin: 5,
    },
    more_icon: {
        margin: 5,
        borderRadius: ICON_SIZE * 2,
    },
});

export default RestaurantVideoScreen;
