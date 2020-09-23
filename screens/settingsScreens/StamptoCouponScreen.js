import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import CardTemplate from "../../templates/CardTemplate";

const StampView = () => {
    return(
        <View>
            
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
        />
    );
}

const styles = StyleSheet.create({

});

export default StamptoCouponScreen;