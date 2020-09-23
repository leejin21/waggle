import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import BottomButton from "../../components/BottomButton";
import Card from "../../components/Card";
import { Pick, Menu, Star, ReviewButtonGroup } from "../../components/ReviewComps";

const orderedMenuData = [
    { id: 0, name: "비빔밥", photo: require("../../assets/images/thumbnails/bibimbap.jpg") },
    { id: 1, name: "고기", photo: require("../../assets/images/thumbnails/meat.jpg") },
    { id: 2, name: "타코", photo: require("../../assets/images/thumbnails/mexican.jpg") },
    { id: 3, name: "얼그레이 케이크", photo: require("../../assets/images/thumbnails/earlgreycake.jpg") },
];

const sliceMenuName = (name) => {
    let menu_name = name;
    if (name.length > 5) {
        // TODO 디자인팀 문의
        let m_list = name.split(" ");
        if (m_list.length === 2 && m_list[0] <= 5 && m_list[0] <= 5) {
            menu_name += m_list[0] + "\n" + m_list[1];
        } else {
            menu_name = name.slice(0, name.length / 2) + "\n" + name.slice(name.length / 2);
        }
    }
    return menu_name;
};

const ReviewScreen = (props) => {
    props.navigation.setOptions({ title: props.route.params.title });

    // TODO useContext, useReducer 이용해서 정리하기
    const [curMenu, setCurMenu] = useState(0);
    const [starPoint, setStarPoint] = useState([true, true, true, false, false]);
    const [saltReview, setSaltReview] = useState(-1);
    const [amountReview, setAmountReview] = useState(-1);
    const [otherReview, setOtherReview] = useState(-1);

    const setStarPointState = (i) => {
        setStarPoint((starPoint) => {
            return starPoint.map((x, id) => (id <= i ? true : false));
        });
    };
    return (
        <View style={{ ...CommonStyles.body, width: "100%" }}>
            <View style={styles.body__middle}>
                <Card style={{ ...styles.card, height: "25%", flex: 0 }}>
                    <Pick></Pick>
                    <FlatList
                        key={"_"}
                        data={orderedMenuData}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return <Menu photo={item.photo} menu_name={sliceMenuName(item.name)} setCurMenu={setCurMenu} id={item.id} active={curMenu == item.id ? true : false}></Menu>;
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        style={{ marginBottom: -15 }}
                    ></FlatList>
                </Card>
                <Card style={{ ...styles.card, ...styles.review__card }}>
                    <View style={styles.review__star}>
                        {starPoint.map((x, star_id) => {
                            const name = x ? "star" : "star-border";
                            return <Star name={name} id={star_id} key={star_id} setStarPointState={setStarPointState}></Star>;
                        })}
                    </View>
                    <View style={styles.review__section}>
                        <ReviewButtonGroup tags={["싱거워요", "적당해요", "짜요"]} direction="row" setState={setSaltReview} state={saltReview}></ReviewButtonGroup>
                        <ReviewButtonGroup tags={["양 적어요", "적당해요", "양 많아요"]} direction="row" setState={setAmountReview} state={amountReview}></ReviewButtonGroup>
                    </View>
                    <View style={styles.review__section}>
                        <ReviewButtonGroup
                            tags={["눅눅해요", "소스가 덜 묻어있어요", "너무 식어서 왔어요", "요청이 누락됐어요"]}
                            direction="column"
                            setState={setOtherReview}
                            state={otherReview}
                        ></ReviewButtonGroup>
                    </View>
                </Card>
            </View>

            <View style={CommonStyles.body__end}>
                <BottomButton active={true} style_back_color={{ backgroundColor: Colors.black_grey }}>
                    <Text style={styles.button_text}>눈송슐랭 평가완료!</Text>
                </BottomButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body__middle: {
        ...CommonStyles.body__middle,
        width: "100%",
        marginBottom: 10,
        justifyContent: "flex-start",
    },
    card: {
        width: "95%",
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    review__card: {
        flex: 0,
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 5,
    },
    review__star: {
        flexDirection: "row",
        marginBottom: 10,
    },
    review__section: {
        marginVertical: 3,
        width: "100%",
        alignItems: "center",
        // backgroundColor: "pink",
    },
    button_text: {
        ...CommonStyles.bold_text,
        color: Colors.light_grey,
    },
});

export default ReviewScreen;
