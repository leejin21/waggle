import React from "react";
import { View } from "react-native";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";

import CardTemplate from "../../templates/CardTemplate";

const InquiryView = () => {
    return(
        <View>
        </View>
    );
}

const InquiryScreen = (props) => {
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
        cardview={<InquiryView></InquiryView>}
        buttonname={"전송하기"}
        toWhere={"HomeMain"} // 일단 main화면으로
        navigation={props.navigation}
        isFullcard={true}
        />
    );
}

export default InquiryScreen;