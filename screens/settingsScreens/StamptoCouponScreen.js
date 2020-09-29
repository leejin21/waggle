import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";
import CheckCircle from "../../components/CheckCircle";

import CardTemplate_modal from "../../templates/CardTemplate_modal";

const circle_size = 93;

const StampView = ({fullstampNum, laststampNum}) => {
    const stamps = [
        {id: 1, date: "20.09.15"},
        {id: 2, date: "20.09.16"}
    ]
    //const fullstampNum = 10; // 12개 중 fullstampNum개는 exist = true
    //const laststampNum = 2;  // fullstampNum개 중 laststampNum개는 checked = true
    // 아니면 exist면 1, 거기에다가 checked면 1 더해서 2로 할까?

    const Circle = ({num}) => { // bool인 checked, exist 받음
        if(num > 0){ // exist
            if(num > 1){ // checked
                return <CheckCircle SIZE={circle_size} touchable={false}></CheckCircle>;
            }
            return <TouchableHighlight style={styles.circle}/>;
        }
        // exist=false: return nothing
        return <TouchableHighlight style={{...styles.circle, backgroundColor: "#565656"}}/>;
    }

    const MakeArray = () => {
        var arr = [];
        var num = 0;
        for(i=0; i<12; i++){
            if(i<fullstampNum){
                num++;
                if(i<laststampNum){
                    num++;
                }
            }
            arr.push(num);
            num = 0;
        }

        return arr;
    }

    const arr = MakeArray();

    return(
        <View style={{...styles.view_out, zIndex: 0}}> 
            <View style={{...styles.view_in, zIndex: 2}}>
                {[arr[0], arr[1], arr[2]].map((n) => {return <Circle num={n}/>})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {[arr[3], arr[4], arr[5]].map((n) => {return <Circle num={n}/>})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {[arr[6], arr[7], arr[8]].map((n) => {return <Circle num={n}/>})}
            </View>
            <View style={{...styles.view_in, zIndex: 2}}>
                {[arr[9], arr[10], arr[11]].map((n) => {return <Circle num={n}/>})}
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
            color: Colors.deep_yellow,
        },
        title: props.route.params.title
    });
    
    return (
        <CardTemplate_modal
        cardview={<StampView fullstampNum={props.route.params.fullstampNum} laststampNum={props.route.params.laststampNum}></StampView>}
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