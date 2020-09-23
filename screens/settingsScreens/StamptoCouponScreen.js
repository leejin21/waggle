import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";
import CheckCircle from "../../components/CheckCircle";

import CardTemplate from "../../templates/CardTemplate";

const circle_size = 93;

const StampView = () => {
    const Circle_check = () => {
        return(
            <CheckCircle SIZE={circle_size} touchable={false}></CheckCircle>
        );
    }
    const Circle_uncheck = () => {
        return(
            <CheckCircle SIZE={circle_size} touchable={false} checked={false}></CheckCircle>
        );
    }

    return(
        <View style={styles.view_out}>
            <View style={styles.view_in}>
                <Circle_check/><Circle_check/><Circle_check/>
            </View>
            <View style={styles.view_in}>
                <Circle_check/><Circle_check/><Circle_check/>
            </View>
            <View style={styles.view_in}>
                <Circle_check/><Circle_check/><Circle_check/>
            </View>
            <View style={styles.view_in}>
                <Circle_check/><Circle_check/><Circle_check/>
            </View>
        </View>
        
    );
}

const StamptoCouponScreen = (props) => {
    props.navigation.setOptions({
        ...headerOptions,
        headerTintColor: Colors.text_grey,
        headerStyle: {
            ...headerOptions.headerStyle,
            backgroundColor: Colors.mid_grey,
        },
        headerTitleStyle: {
            ...headerOptions.headerTitleStyle,
            color: "white",
        },
    });
    
    return (
        <CardTemplate
        cardview={<StampView></StampView>}
        buttonname={"쿠폰발급하기"}
        toWhere={"HomeMain"} //일단 HomeMain으로
        navigation={props.navigation}
        isFullcard={false}
        detailtxt={"리뷰 작성 시마다 스탬프 1개 적립!\n10개 적립시 A메뉴 무료시식권 증정"}
        card_flex={9}
        card_padding={10}
        />
    );
}

const styles = StyleSheet.create({
    view_out: {
        flex: 1,
        width: "100%", 
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingTop: 15,
    },
    view_in: {
        flex: 1,
        width: "100%", 
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
    }
});

export default StamptoCouponScreen;