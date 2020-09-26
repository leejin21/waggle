// use: basket, order, stampbox
// need some variety

// header; all-black / grey
// header 설정도 여기로 옮기자

// bottombutton 유무

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";
import BottomButton from "../components/BottomButton";
import { headerOptions } from "../constants/Options";

const BottomButton_1 = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>{props.name}</Text>
        </BottomButton>
    );
};

const NoCardTemplate = (props) => {   
    // props; 
    // (default) bodyview, buttonname, toWhere, navigation, needButton, isHeaderBlack, data

    return props.needButton? 
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, justifyContent: "flex-start", width: "100%" }}>
                {props.bodyview}
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}>
                <BottomButton_1 name={props.buttonname} onPress={() => props.navigation.navigate(props.toWhere, props.data)}/>
            </View>
        </View>
    ):
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, justifyContent: "flex-start", width: "100%" }}>
                {props.bodyview}
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}/>
        </View>
    );
};

export default NoCardTemplate;
