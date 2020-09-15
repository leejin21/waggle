// USE:: main: home main
import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableHighlight, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const BORDER_RADIUS = 20;
const HEART_SIZE = 20;

const HeartIcon = (props) => {
    const [color, setColor] = useState(props.heart_filled ? "red" : Colors.text_grey);
    // TODO 변경된 정보 저장했다가 스크린 넘어갈 때 db로 fetch해서 저장하기
    // SERVER TODO db에서 넘겨줄 때, 해당 데이터 위주로 sort시켜야 함
    return (
        <TouchableWithoutFeedback onPress={() => setColor((color) => (color === Colors.text_grey ? "red" : Colors.text_grey))} style={props.style}>
            <AntDesign name="heart" size={HEART_SIZE} color={color} />
        </TouchableWithoutFeedback>
    );
};

const ListPhoto = (props) => {
    // TODO PHOTO HEIGHT 이미지에서 받아와서 맞춰 주기: 비율 관련해서 계산.
    const ITEM_WIDTH = props.ITEM_WIDTH - 30;
    const ITEM_HEIGHT = (ITEM_WIDTH * 240) / 150;
    const PHOTO_HEIGHT = (ITEM_WIDTH * 4) / 3;

    const GAP = (ITEM_HEIGHT - PHOTO_HEIGHT) / 2;
    const ICON_SIZE = 60;

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.image__wrapper} onPress={() => props.navigation.navigate("RestVideo")}>
                <ImageBackground source={props.item} style={{ ...styles.image__photo, width: ITEM_WIDTH, height: ITEM_HEIGHT }} imageStyle={{ height: PHOTO_HEIGHT, marginTop: GAP }}>
                    <AntDesign name="caretright" size={ICON_SIZE} color={Colors.deep_yellow} />
                </ImageBackground>
            </TouchableHighlight>
            <View style={styles.info__wrapper}>
                <Text style={styles.info__name}>{props.rest_name}</Text>
                <HeartIcon heart_filled={props.heart_filled} style={styles.info__heart}></HeartIcon>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    image__wrapper: {
        margin: 10,
        borderRadius: BORDER_RADIUS,
    },
    image__photo: {
        // photo size: 3:4
        // want: 2:3, and background: black
        flex: 1,
        resizeMode: "contain",

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: BORDER_RADIUS,
    },
    info__wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    info__name: {
        color: "white",
        fontFamily: "noto_bold",
        fontSize: 17,
        flex: 6,
        textAlign: "center",
    },
    info__heart: {
        flex: 1,
    },
});

export default ListPhoto;
