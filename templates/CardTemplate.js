// use: editinfo, stamptocoupon, inquiry screens, signup screen
// need some variety

// header; all-black / grey
// header 설정도 여기로 옮기자

// card; full / explanation space

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CommonStyles from "../constants/CommonStyles";
import Card from "../components/Card";
import BottomButton from "../components/BottomButton";

const BottomButton_1 = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>{props.name}</Text>
        </BottomButton>
    );
};

const CardTemplate = (props) => {   
    // props; 
    // (default) cardview, buttonname, toWhere, navigation, isFullcard
    // (if isFullcard is false) detailtxt
    return props.isFullcard? 
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, width: "100%" }}>
                <Card style={{width:"95%", marginBottom: 15}}>
                    {props.cardview}
                </Card>
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}>
                <BottomButton_1 name={props.buttonname} onPress={() => props.navigation.navigate(props.toWhere)}/>
            </View>
        </View>
    ):
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
        <View style={{ ...CommonStyles.body__middle, width: "100%" }}>
            <View style={{...CommonStyles.body, width: "100%"}}>
                <Text style={CommonStyles.small_text}>
                    {props.detailtxt}
                </Text>
            </View>
            <View style={{ ...CommonStyles.body__middle, width: "100%" }}>
                <Card style={{width:"95%", marginBottom: 15}}>
                    {props.cardview}
                </Card>
            </View>
        </View>
        <View style={{ ...CommonStyles.body__end, width: "100%" }}>
            <BottomButton_1 name={props.buttonname} onPress={() => props.navigation.navigate(props.toWhere)}/>
        </View>
        </View>
    );
};

export default CardTemplate;
