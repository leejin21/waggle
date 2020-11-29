import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";
import CheckCircle from "../../components/CheckCircle";

import CardTemplate_modal from "../../templates/CardTemplate_modal";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const circle_size = font*9.3;

const StampView = ({fullstampNum, laststampNum}) => {
    console.log(fullstampNum, laststampNum);
    const stamps = [
        {id: 1, date: "20.09.15"},
        {id: 2, date: "20.09.16"}
    ]
    //const fullstampNum = 10; // 12개 중 fullstampNum개는 exist = true
    //const laststampNum = 2;  // fullstampNum개 중 laststampNum개는 checked = true
    // 아니면 exist면 1, 거기에다가 checked면 1 더해서 2로 할까?

    const Circle = ({num, idx}) => { // bool인 checked, exist 받음
        if(num > 0){ // exist
            if(num > 1){ // checked
                return (
                    <View style={{alignItems:"center"}}>
                        <CheckCircle SIZE={circle_size} touchable={false}></CheckCircle>
                        <Text style={{color:"white", fontSize:font*1.3}}>{stamps[idx].date}</Text>
                    </View>
                );
            }
            return (
                <TouchableHighlight style={styles.circle}/>
            );
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
            arr.push([i, num]);
            num = 0;
        }

        return arr;
    }

    const arr = MakeArray();

    return(
        <View style={{...styles.view_out, zIndex: 0}}> 
            <View style={{...styles.view_in_odd, zIndex: 2}}>
                {[arr[0], arr[1], arr[2]].map((n) => {return <Circle num={n[1]} idx={n[0]} key={n[0]}/>})}
            </View>
            <View style={{...styles.view_in_even, zIndex: 2}}>
                {[arr[3], arr[4], arr[5]].map((n) => {return <Circle num={n[1]} idx={n[0]} key={n[0]}/>})}
            </View>
            <View style={{...styles.view_in_odd, zIndex: 2}}>
                {[arr[6], arr[7], arr[8]].map((n) => {return <Circle num={n[1]} idx={n[0]} key={n[0]}/>})}
            </View>
            <View style={{...styles.view_in_even, zIndex: 2}}>
                {[arr[9], arr[10], arr[11]].map((n) => {return <Circle num={n[1]} idx={n[0]} key={n[0]}/>})}
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
        cardview={
            <StampView 
                fullstampNum={props.route.params.fullstampNum} 
                laststampNum={props.route.params.laststampNum}
            ></StampView>
        }
        buttonname={"쿠폰발급하기"}
        toWhere={"HomeMain"} //일단 HomeMain으로
        navigation={props.navigation}
        detailtxt={"리뷰 작성 시마다 스탬프 1개 적립!\n10개 적립시 A메뉴 무료시식권 증정"}
        card_flex={9}
        card_padding={10}
        modal_title={props.route.params.title}
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
        paddingTop: pad*1.5,
    },
    view_in_odd: {
        flex: 1,
        width: "100%", 
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        
    },
    view_in_even: {
        flex: 1,
        width: "100%", 
        height: "100%",
        flexDirection: "row-reverse",
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
