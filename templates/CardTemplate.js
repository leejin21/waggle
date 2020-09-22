// use: editinfo, stamp, inquiry screens

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
    // props; cardview, buttonname, toWhere, navigation
    return (
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
    );
};

export default CardTemplate;
