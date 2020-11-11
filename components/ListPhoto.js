// USE:: main: home main
import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableHighlight, StyleSheet, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;

const BORDER_RADIUS = pad*2;
const HEART_SIZE = pad*2;

const HeartIcon = (props) => {
    // props: heart_filled
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
    const ITEM_WIDTH = props.ITEM_WIDTH - pad*2.5;
    const ITEM_HEIGHT = (ITEM_WIDTH * 240) / 150;
    const PHOTO_HEIGHT = (ITEM_WIDTH * 4) / 3;

    const GAP = (ITEM_HEIGHT - PHOTO_HEIGHT) / 2;
    const ICON_SIZE = pad*6;

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.image__wrapper}
                onPress={() =>
                    props.navigation.navigate("RestVideo", {
                        title: props.rest_name,
                    })
                }
            >
                <ImageBackground source={props.item} style={{ ...styles.image__photo, width: ITEM_WIDTH, height: ITEM_HEIGHT }} imageStyle={{ height: PHOTO_HEIGHT, marginTop: GAP }}>
                    <AntDesign name="caretright" size={ICON_SIZE} color={Colors.deep_yellow} />
                </ImageBackground>
            </TouchableHighlight>
            <View style={styles.info__wrapper}>
                <Text style={styles.info__name}>{props.rest_name}</Text>
                <HeartIcon heart_filled={props.heart_filled} style={{ flex: 1 }}></HeartIcon>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: pad*1.5,
    },
    image__wrapper: {
        margin: pad,
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
        paddingHorizontal: pad*1.5,
    },
    info__name: {
        color: "white",
        fontFamily: "noto_bold",
        fontSize: windowHeight / 53,
        flex: 6,
        textAlign: "center",
    },
});

export default ListPhoto;
export { HeartIcon };
