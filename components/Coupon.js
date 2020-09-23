// USE:: settings screens: coupon

import React, { useState, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";
import { headerOptions } from "../constants/Options";

import Card from "../components/Card";
import { FlatList, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

// TODO 화면 크기에 맞춰서 해당 width, height 등등을 조절
const StampCoupon = (props) => {
    // props: usable, name, content, useDate
    const [removed, setRemoved] = useState(false);
    const [usable, setUsable] = useState(props.usable);
    return removed ? (
        // 삭제한 쿠폰
        <View></View>
    ) : (
        <Card style={{ ...styles.card, backgroundColor: Colors.deep_yellow }}>
            <View style={styles.card__title}>
                <Text style={{ ...styles.card__title__txt, color: Colors.high_pink, fontSize: 29 }}>스탬프 완료쿠폰</Text>
                <TouchableHighlight
                    style={{ width: props.ICON_SIZE, height: props.ICON_SIZE, borderRadius: props.ICON_SIZE }}
                    underlayColor={Colors.dark_pink}
                    onPress={() => setRemoved((removed) => true)}
                >
                    <MaterialIcons name="cancel" size={props.ICON_SIZE} color={Colors.orange_pink} />
                </TouchableHighlight>
            </View>
            <View style={styles.card__border}></View>
            <View style={styles.card__body}>
                <Text style={{ ...styles.card__body__txt, color: "black", fontSize: 22 }}>{props.name}</Text>
                <Text style={{ ...styles.card__body__txt, color: "black" }}>{props.content}</Text>
            </View>
            {usable ? (
                // 사용 가능한 쿠폰
                <View>
                    <TouchableOpacity style={{ ...styles.card__button, backgroundColor: Colors.high_pink }} onPress={() => setUsable((usable) => false)}>
                        <Text style={{ ...styles.card__button__txt, color: "white" }}>무료증정권 사용하기</Text>
                        <Text style={{ ...styles.card__button__date, color: Colors.dark_grey }}>{"~ " + props.useDate}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // 사용 불가한 쿠폰
                <View>
                    <View style={styles.card__button}>
                        <Text style={styles.card__button__txt}>사용완료</Text>
                        <Text style={styles.card__button__date}>{props.useDate}</Text>
                    </View>
                </View>
            )}
        </Card>
    );
};

const Coupon = (props) => {
    // props: usable, reviewed, name, content, useDate, ICON_SIZE

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "USED__REVIEW_ABLE":
                    return {
                        ...prevState,
                        usable: false,
                    };
                case "USED__REVIEWED":
                    return {
                        ...prevState,
                        review_able: false,
                    };
                case "USED__REMOVED":
                    return {
                        ...prevState.prevState,
                        removed: true,
                    };
            }
        },
        {
            usable: props.usable,
            review_able: props.review_able,
            removed: false,
        }
    );

    // TODO removed=== true일때, View로 처리하고 화면에서 나가거나 할 때(일단 이 경우로 removed를 고려하겠음) fetch해서 바꾸도록 할 지, 아니면 그 자리에서 바로 fetch할 지

    return state.removed ? (
        // 삭제한 쿠폰
        <View></View>
    ) : (
        <Card style={styles.card}>
            <View style={styles.card__title}>
                <Text style={styles.card__title__txt}>{props.name}</Text>
                <TouchableHighlight
                    style={{ width: props.ICON_SIZE, height: props.ICON_SIZE, borderRadius: props.ICON_SIZE }}
                    underlayColor={Colors.body_grey}
                    onPress={() => dispatch({ type: "USED__REMOVED" })}
                >
                    <MaterialIcons name="cancel" size={props.ICON_SIZE} color={Colors.text_grey} />
                </TouchableHighlight>
            </View>
            <View style={styles.card__border}></View>
            <View style={styles.card__body}>
                <Text style={styles.card__body__txt}>{props.content}</Text>
            </View>
            {state.usable ? (
                // 사용 가능한 쿠폰
                <View>
                    <TouchableOpacity style={{ ...styles.card__button, backgroundColor: Colors.deep_yellow }} onPress={() => dispatch({ type: "USED__REVIEW_ABLE" })}>
                        <Text style={{ ...styles.card__button__txt, color: "black" }}>사이드메뉴 무료증정권 사용하기</Text>
                        <Text style={{ ...styles.card__button__date, color: "black" }}>{"~ " + props.useDate}</Text>
                    </TouchableOpacity>
                    <View style={styles.card__button}>
                        <Text style={styles.card__button__txt}>리뷰 남기고 스탬프 찍기</Text>
                    </View>
                </View>
            ) : (
                // 사용 불가한 쿠폰
                <View>
                    {state.review_able ? (
                        // 리뷰 아직 안하고 도장 아직 안 찍은 쿠폰
                        <View>
                            <View style={{ ...styles.card__button, backgroundColor: "black" }}>
                                <Text style={styles.card__button__txt}>사용완료</Text>
                                <Text style={styles.card__button__date}>{props.useDate}</Text>
                            </View>
                            <TouchableOpacity
                                style={{ ...styles.card__button, backgroundColor: Colors.deep_yellow }}
                                onPress={() => {
                                    dispatch({ type: "USED__REVIEWED" });
                                    props.navigation.navigate("Review", {
                                        title: props.name,
                                    });
                                }}
                            >
                                <Text style={{ ...styles.card__button__txt, color: "black" }}>리뷰 남기고 스탬프 찍기</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // 이미 리뷰하고 도장 찍은 쿠폰
                        <View>
                            <View style={styles.card__button}>
                                <Text style={styles.card__button__txt}>사용완료</Text>
                                <Text style={styles.card__button__date}>{props.useDate}</Text>
                            </View>
                            <View style={styles.card__button}>
                                <Text style={styles.card__button__txt}>리뷰 남기고 스탬프 찍기</Text>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </Card>
    );
};
const styles = StyleSheet.create({
    // Coupon comp의 styles
    // TODO 핸드폰 dimenstion size에 따라 달라질 수 있으므로 비율로 margin, padding 다 조정하기(b/c card__button)
    card: {
        width: "95%",
        flex: 0,
        marginVertical: 5,
        padding: 10,
    },
    card__title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    card__title__txt: {
        ...CommonStyles.bold_text,
        fontSize: 27,
        paddingTop: 20,
        color: Colors.deep_yellow,
        flex: 1,
        paddingLeft: 50,
    },
    card__border: {
        marginTop: 20,
        marginHorizontal: 30,
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
    card__body: {
        marginHorizontal: 30,
        paddingVertical: 15,
        paddingHorizontal: 5,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    card__body__txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: 18,
        fontFamily: "noto_bold",
    },
    card__button: {
        ...CommonStyles.grey_button,
        marginHorizontal: 20,
        marginVertical: 5,
        height: 70,
        backgroundColor: Colors.black_grey,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        padding: 10,
    },
    card__button__txt: {
        color: Colors.text_grey,
        fontSize: 21,
        fontFamily: "noto_bold",
    },
    card__button__date: {
        color: Colors.text_grey,
        fontSize: 15,
        fontFamily: "noto_regular",
    },
});

export default Coupon;
export { StampCoupon };
