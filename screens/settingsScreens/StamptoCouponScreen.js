import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";
import CheckCircle from "../../components/CheckCircle";

import CardTemplate from "../../templates/CardTemplate";

const circle_size = 93;

const StampView = () => {
    const stamps = [
        {id: 1, date: "20.09.15"},
        {id: 2, date: "20.09.16"}
    ]
    const fullstampNum = 10;
    const laststampNum = 2;

    const Circle = ({checked}) => {
        return(
        checked? <CheckCircle SIZE={circle_size} touchable={false}></CheckCircle>:<TouchableHighlight style={styles.circle}/>
        );
    }

    // 그냥 라인별 말고 다 한번에?
    const RenderCircle = () => {
        // 차라리 하나씩 가면서 stampNum에 걸리는지, endNum에 걸리는지 한번에 보는게 낫지 않을까?
        // vector로 하는게 낫겠다...

        return [[0, 1, 1], [1, 1, 1], [0, 0, 0], [1, 1, 0]];
        
    }
    const arr = [[0, 1, 1], [1, 1, 1], [0, 0, 0], [1, 1, 0]];

    return(
        <View style={{...styles.view_out, zIndex: 0}}> 
            <View style={{...styles.view_in, zIndex: 2}}>
                {arr[0].map((n) => {return <Circle checked={n} />})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {arr[1].map((n) => {return <Circle checked={n} />})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {arr[2].map((n) => {return <Circle checked={n} />})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {arr[3].map((n) => {return <Circle checked={n} />})}
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
        title: props.route.params.title
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
    },

    circle: {
        height: circle_size,
        width: circle_size,
        borderRadius: circle_size * 2,
        backgroundColor: "#2E2E2E"
    }
});

export default StamptoCouponScreen;