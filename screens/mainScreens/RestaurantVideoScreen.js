import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Video } from "expo-av";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";

import { HeartIcon } from "../../components/ListPhoto";
import { Feather } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import CommonStyles from "../../constants/CommonStyles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const ICON_SIZE = font*2.4;

const HeaderRight = () => {
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
            height: font*15,
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
                {/* FIXME IOS: not working, need to eject */}
                <Video
                    source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={false}
                    resizeMode="cover"
                    isLooping={false}
                    useNativeControls
                    style={{ width: windowWidth, height: font*30 }}
                ></Video>
            </View>
            <View style={styles.button__wrapper}>
                <BottomButton active={true} onPress={() => props.navigation.navigate("Basket", { title: props.route.params.title })}>
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
        marginRight: pad*0.5,
    },
    heart_icon: {
        margin: pad*0.5,
    },
    more_icon: {
        margin: pad*0.5,
        borderRadius: ICON_SIZE * 2,
    },
});

export default RestaurantVideoScreen;
