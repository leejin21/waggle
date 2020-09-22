import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

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
        <View></View>
    );
}

const styles = StyleSheet.create({

});

export default InquiryScreen;