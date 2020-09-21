import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableHighlight } from "react-native";

import BottomButton from "../../components/BottomButton";
import { AuthContext } from "../../navigation/WaggleNavigator";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import Card from "../../components/Card";
import { Pick } from "../../components/ReviewComps";
import ProfileLogo from "../../components/ProfileLogo";

const DIAMETER = 70;

const orderedMenuData = [
    { name: "비빔밥", photo: require("../../assets/images/thumbnails/bibimbap.jpg") },
    { name: "고기", photo: require("../../assets/images/thumbnails/meat.jpg") },
    { name: "타코", photo: require("../../assets/images/thumbnails/mexican.jpg") },
    { name: "얼그레이 케이크", photo: require("../../assets/images/thumbnails/earlgreycake.jpg") },
];

const ReviewScreen = (props) => {
    props.navigation.setOptions({
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
        title: props.route.params.title,
    });
    return (
        <View style={{ ...CommonStyles.body, width: "100%" }}>
            <View style={styles.body__middle}>
                <Card style={{ ...styles.pick__card, height: "25%", flex: 0 }}>
                    <Pick></Pick>
                    <FlatList
                        key={"_"}
                        data={orderedMenuData}
                        horizontal={true}
                        renderItem={({ item }) => {
                            let menu_name = item.name;
                            if (item.name.length > 5) {
                                // TODO 디자인팀 문의
                                let m_list = item.name.split(" ");
                                if (m_list.length === 2 && m_list[0] <= 5 && m_list[0] <= 5) {
                                    menu_name += m_list[0] + "\n" + m_list[1];
                                } else {
                                    menu_name = item.name.slice(0, item.name.length / 2) + "\n" + item.name.slice(item.name.length / 2);
                                }
                            }
                            return (
                                <View style={styles.pick__menu__wrapper}>
                                    <TouchableHighlight style={styles.pick__image__wrapper} underlayColor={Colors.high_pink} onPress={() => {}}>
                                        <Image source={item.photo} style={styles.pick__image} imageStyle={{ width: DIAMETER, height: DIAMETER, borderRadius: DIAMETER * 2 }}></Image>
                                    </TouchableHighlight>
                                    <Text style={styles.pick__menu__text}>{menu_name}</Text>
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginBottom: -15 }}
                    ></FlatList>
                </Card>
                <Card style={{ ...styles.pick__card, flex: 0 }}></Card>
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
    pick__card: {
        width: "95%",
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },

    pick__menu__wrapper: {
        marginTop: 5,
        marginHorizontal: 7,
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
        fontSize: 13,
        fontFamily: "noto_bold",
        color: "white",
        textAlign: "center",
        marginVertical: 5,
    },

    button_text: {
        ...CommonStyles.bold_text,
        color: Colors.light_grey,
    },
});

export default ReviewScreen;
