// USE: all except for main:home main, settings:edit info

import React from "react";
import { View, Text, TouchableHighlight, ImageBackground, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";

import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 89;

const DIAMETER = font*7;

const Pick = () => {
    return (
        <View style={styles.pick__wrapper}>
            <Text style={styles.pick__text}>눈송</Text>
            <Text style={{ ...styles.pick__text, color: "white" }}>'s PICK</Text>
        </View>
    );
};

const Menu = (props) => {
    // props: active, photo, menu_name, setCurMenuState, id,  dispatch, action_type
    return (
        <View style={styles.pick__menu__wrapper}>
            <TouchableHighlight
                style={props.active ? { ...styles.pick__image__wrapper, backgroundColor: Colors.high_pink } : styles.pick__image__wrapper}
                underlayColor={Colors.high_pink}
                onPress={() => {
                    props.dispatch({ type: props.action_type, curMenu: props.id });
                }}
            >
                <ImageBackground source={props.photo} style={styles.pick__image} imageStyle={{ width: DIAMETER, height: DIAMETER, borderRadius: DIAMETER * 2 }}></ImageBackground>
            </TouchableHighlight>
            <Text style={styles.pick__menu__text}>{props.menu_name}</Text>
        </View>
    );
};

const Star = (props) => {
    // props: name, id, setStarPointState, dispatch, action_type
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.dispatch({ type: props.action_type, star: props.id });
            }}
        >
            <MaterialIcons name={props.name} size={windowWidth / 7} color={Colors.deep_yellow}></MaterialIcons>
        </TouchableWithoutFeedback>
    );
};

const ReviewButton = (props) => {
    // props: id, wing, content, active, direction, state, dispatch, action_type
    const review__button = props.active ? { ...styles.review__button, backgroundColor: Colors.deep_yellow } : styles.review__button;
    const review__button__col = props.active ? { ...styles.review__button__col, backgroundColor: Colors.deep_yellow } : styles.review__button__col;

    return props.wing ? (
        <View style={styles.review__wing__wrapper}>
            <View style={styles.review__button__wing}></View>
            <TouchableHighlight
                style={review__button}
                onPress={() => {
                    // console.log("level", props.id);
                    props.dispatch({ type: props.action_type, level: props.id });
                }}
            >
                <Text style={styles.review__button__text}>{props.content}</Text>
            </TouchableHighlight>
            <View style={styles.review__button__wing}></View>
        </View>
    ) : (
        <TouchableHighlight
            style={props.direction === "row" ? review__button : review__button__col}
            onPress={
                props.direction === "row"
                    ? () => {
                          //   console.log("level", props.id);
                          props.dispatch({ type: props.action_type, level: props.id });
                      }
                    : () => {
                          // direction==column일 경우 누른 버튼 다시 누르면 누름 취소되게 함
                          if (props.state === props.id) {
                              // 원래 눌린 버튼 == 현재 누른 버튼일 때 누름 취소
                              //   console.log("level", -1);
                              props.dispatch({ type: props.action_type, level: -1 });
                          } else {
                              //   console.log("level", props.id);
                              props.dispatch({ type: props.action_type, level: props.id });
                          }
                      }
            }
        >
            <Text style={styles.review__button__text}>{props.content}</Text>
        </TouchableHighlight>
    );
};

const ReviewButtonGroup = (props) => {
    // props: tags, direction, state, dispatch, action_type
    return (
        <View style={props.direction === "row" ? styles.review__group : { ...styles.review__group, flexDirection: "column" }}>
            {props.tags.map((x, id) => {
                let wing = false;
                let active = false;
                if (id === 1 && props.direction === "row") {
                    wing = true;
                }
                if (id === props.state) {
                    active = true;
                }
                return (
                    <ReviewButton
                        wing={wing}
                        active={active}
                        direction={props.direction}
                        content={x}
                        key={id}
                        id={id}
                        dispatch={props.dispatch}
                        state={props.state}
                        action_type={props.action_type}
                    ></ReviewButton>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    review__group: {
        flexDirection: "row",
        marginVertical: pad*0.5,
    },
    review__wing__wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    review__button__wing: {
        borderBottomColor: Colors.deep_yellow,
        borderBottomWidth: pad*0.2,
        width: windowWidth / 20,
    },
    review__button: {
        backgroundColor: "white",
        padding: pad,
        width: (windowWidth * 2) / 9,
        borderRadius: pad*1.8,
    },
    review__button__col: {
        backgroundColor: "white",
        padding: pad,
        width: windowWidth / 2,
        borderRadius: pad*1.8,
        marginVertical: pad*0.3,
    },
    review__button__text: {
        fontSize: font*1.8,
        fontFamily: "noto_regular",
        textAlign: "center",
    },
    pick__wrapper: {
        backgroundColor: Colors.black_grey,
        borderRadius: pad*4.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: pad*0.5,
        paddingTop: pad*0.7,
        paddingHorizontal: pad,
        width: "50%",
        marginTop: -pad*3.8,
    },
    pick__text: {
        color: Colors.deep_yellow,
        fontSize: font*2,
        fontFamily: "noto_bold",
    },

    pick__menu__wrapper: {
        marginTop: pad*0.5,
        marginHorizontal: pad*0.7,
        alignItems: "center",
    },
    pick__image__wrapper: {
        borderRadius: DIAMETER * 2,

        width: (DIAMETER * 11) / 10,
        height: (DIAMETER * 11) / 10,
        borderRadius: (DIAMETER * 2 * 11) / 10,
        alignItems: "center",
        justifyContent: "center",
    },
    pick__image: {
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: DIAMETER * 2,
        width: DIAMETER,
        height: DIAMETER,
    },
    pick__menu__text: {
        fontSize: font*1.3,
        fontFamily: "noto_bold",
        color: "white",
        textAlign: "center",
        marginVertical: pad*0.5,
    },
});

export { Pick, Menu, Star, ReviewButtonGroup, ReviewButton };
