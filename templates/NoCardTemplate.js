// use: basket, order, stampbox
// need some variety

// header; all-black / grey
// header 설정도 여기로 옮기자

// bottombutton 유무

import React from "react";
import { View, Text } from "react-native";
import CommonStyles from "../constants/CommonStyles";
import BottomButton from "../components/BottomButton";

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
    // buttonFetch: only in OrderScreen
    
    const buttonFetch = (props.buttonFetch) ? props.buttonFetch : ()=>{};

    return props.needButton? 
    (
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, justifyContent: "flex-start", width: "100%" }}>
                {props.bodyview}
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}>
                <BottomButton_1 
                    name={props.buttonname} 
                    onPress={() => {
                        buttonFetch();
                        return props.navigation.navigate(props.toWhere, props.data);
                    }}/>
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
