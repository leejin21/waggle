//CardTemplate 배껴옴
//stampcouponscr용

import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CommonStyles from "../constants/CommonStyles";
import Card from "../components/Card";
import BottomButton from "../components/BottomButton";

//import Modal from "react-native-modal";

const BottomButton_2 = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>{props.name}</Text>
        </BottomButton>
    );
};

const CardTemplate_modal = (props) => {   
    // props; 
    // (default) cardview, buttonname, toWhere, navigation, isFullcard
    // (if isFullcard is false) detailtxt, card_flex (detail부분이 1), card_padding

    return props.isFullcard? 
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, width: "100%" }}>
                <Card style={{width:"95%", marginBottom: 15}}>
                    {props.cardview}
                </Card>
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}>
                <BottomButton_2 name={props.buttonname} onPress={() => props.navigation.navigate(props.toWhere)}/>
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
            <View style={{ ...CommonStyles.body__middle, width: "100%", flex: props.card_flex }}>
                <Card style={{width:"95%", marginBottom: 15, marginTop: 0, padding: props.card_padding}}>
                    {props.cardview}
                </Card>
            </View>
        </View>
        <View style={{ ...CommonStyles.body__end, width: "100%" }}>
            <BottomButton_2 name={props.buttonname} onPress={() => props.navigation.navigate(props.toWhere)}/>
        </View>
        </View>
    );
};

export default CardTemplate_modal;
