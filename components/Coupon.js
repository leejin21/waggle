// USE:: settings screens: coupon

import React, { useState, useReducer, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";

import Card from "../components/Card";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";

import {par2url, getHeader} from "../fetch/fetchApi";
import { Context } from "../navigation/Store";


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get('window').width;
const pad = windowHeight / 80; 

const putCoupon = async (state, coupon_id, what) => {
    // * PUT event/coupon
    /*
        * JSON FORM
        {
            coupon_id: 1,
            [view_remove: true],
            [used: true],
            [review_able: false]
        }
    */
    const totUrl = par2url('/event/coupon', {});
    const header = getHeader(state.userToken);
    console.log(header);
    const data = {
            coupon_id: coupon_id,
            what: what
    };

    if (what === "view_remove")
        data.view_remove = true;
    else if (what === "used")
        data.used = true;
    else if (what === "review_able")
        data.review_able = false;

    try {    
        let response = await fetch(totUrl, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data),
        });
        console.log(await response.status);
    } catch(error) {
        // error의 경우 뭘 return해 줄 지 고민
        console.log(error);
    }
};

const StampCoupon = (props) => {
    // props: usable, name, content, useDate, coupon_id
    const [removed, setRemoved] = useState(false);
    const [usable, setUsable] = useState(props.usable);
    const [state, dispatch] = React.useContext(Context);
    return removed ? (
        // 삭제한 쿠폰
        <View></View>
    ) : (
        <Card style={{ ...styles.card, backgroundColor: Colors.deep_yellow }}>
            <View style={styles.card__title}>
                <Text style={{ ...styles.card__title__txt, color: Colors.high_pink, fontSize: windowHeight / 28 }}>스탬프 완료쿠폰</Text>
                <TouchableHighlight
                    style={{ width: props.ICON_SIZE, height: props.ICON_SIZE, borderRadius: props.ICON_SIZE }}
                    underlayColor={Colors.dark_pink}
                    onPress={() => {
                        const fetchCoupon = async () => {
                            await putCoupon(state, props.coupon_id, "view_remove");
                        }
                        fetchCoupon();
                        return setRemoved(() => true);
                    }}
                >
                    <MaterialIcons name="cancel" size={props.ICON_SIZE} color={Colors.orange_pink} />
                </TouchableHighlight>
            </View>
            <View style={styles.card__border}></View>
            <View style={styles.card__body}>
                <Text style={{ ...styles.card__body__txt, color: "black", fontSize: windowHeight / 38 }}>{props.name}</Text>
                <Text style={{ ...styles.card__body__txt, color: "black" }}>{props.content}</Text>
            </View>
            {usable ? (
                // 사용 가능한 쿠폰
                <View>
                    <TouchableOpacity style={{ ...styles.card__button, backgroundColor: Colors.high_pink }} onPress={() => {
                        const fetchCoupon = async () => {
                            await putCoupon(state, props.coupon_id, "used");
                        }
                        fetchCoupon();
                        return setUsable(() => false);
                    }}>
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
    // props: usable, reviewed, name, content, useDate, ICON_SIZE, coupon_id
    const [authState, authDispatch] = useContext(Context);
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
                    onPress={() => {
                        const fetchCoupon = async () => {
                            await putCoupon(authState, props.coupon_id, "view_remove");
                        }
                        fetchCoupon();
                        return dispatch({ type: "USED__REMOVED" });
                    }}
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
                    <TouchableOpacity style={{ ...styles.card__button, backgroundColor: Colors.deep_yellow }} onPress={() => {
                        const fetchCoupon = async () => {
                            await putCoupon(authState, props.coupon_id, "used");
                        }
                        fetchCoupon();
                        return dispatch({ type: "USED__REVIEW_ABLE" });
                    }}>
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
                                    const fetchCoupon = async () => {
                                        await putCoupon(authState, props.coupon_id, "review_able");
                                    }
                                    fetchCoupon();
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
    card: {
        // width: "95%",
        // flex: 0,
        margin: pad*0.7,
        padding: pad*2,
    },
    card__title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: 'pink',
    },
    card__title__txt: {
        ...CommonStyles.bold_text,
        fontSize: windowHeight / 28,
        color: Colors.deep_yellow,
        flex: 1,
        paddingLeft: pad*4,
        // backgroundColor: 'pink',
    },
    card__border: {
        marginTop: pad,
        marginHorizontal: pad,
        borderBottomColor: "white",
        borderBottomWidth: 1,
    },
    card__body: {
        marginHorizontal: pad*3,
        paddingVertical: pad*1.5,
        paddingHorizontal: pad*0.5,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    card__body__txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: windowHeight / 42,
        fontFamily: "noto_bold",
    },
    card__button: {
        borderRadius: pad*3,
        marginHorizontal: windowWidth/35,
        marginVertical: pad*0.5,
        height: windowHeight*0.07,
        backgroundColor: Colors.black_grey,
        alignItems: "center",
        justifyContent: "center",
        padding: pad,
    },
    card__button__txt: {
        color: Colors.text_grey,
        fontSize: windowHeight / 40,
        fontFamily: "noto_bold",
    },
    card__button__date: {
        color: Colors.text_grey,
        fontSize: windowHeight / 60,
        fontFamily: "noto_regular",
    },
});

export default Coupon;
export { StampCoupon };
