import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Video } from "expo-av";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";

import { HeartIcon } from "../../components/ListPhoto";
import { Feather } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import CommonStyles from "../../constants/CommonStyles";

import Card from "../../components/Card";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const ICON_SIZE = font*2.4;

const timestamp = [
    {id:0, name: "안녕", milisec: 3000},
    {id: 1, name: "잘가", milisec: 8000}
]
const TimeStamp = (props) => {
    const handleClick = () => {
        props.setPos(props.milisec);
    }

    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <Card style={styles.timestamp}>
                <View>

                </View>
                <View>
                    <Text style={styles.timestamp_txt}>{props.name}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

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

    const [pos, setPos] = useState(0);

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
                    shouldPlay={true}
                    resizeMode="cover"
                    isLooping={false}
                    useNativeControls
                    style={{ width: windowWidth, height: font*30 }}
                    positionMillis={pos}
                ></Video>
            </View>
            <View style={styles.timestamp__wrapper}>
                {timestamp.map((item) => {return <TimeStamp key={item.id} id={item.id} name={item.name} milisec={item.milisec} setPos={setPos}></TimeStamp>})}
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
        flex: 12,
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

    timestamp__wrapper: {
        flex: 1,
    },
    timestamp: {
        backgroundColor: "#565656",
        marginHorizontal: pad,
        borderRadius: pad*2.2,

        width: "95%",
        marginVertical: pad,
        padding: pad*1.5,
        paddingVertical: pad*2.2,

        flexDirection: "row"
    },
    timestamp_txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: windowHeight / 35,
        fontFamily: "noto_bold",
    }
});

export default RestaurantVideoScreen;
