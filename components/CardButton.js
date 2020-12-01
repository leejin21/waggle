// USE:: settings screens: stampboxscreen


import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";

import Card from "../components/Card";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80; 

const CardButton = (props) => {
    // props: name, collected, all, navigation
    // card -> touchablehighlight
    // collected, all -> stringify
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("StampCoupon", {
            title: props.name, 
            fullstampNum: props.all, 
            laststampNum: props.collected,
            info_name: props.info_name
        })}>
            <Card style={styles.card}> 
                <View style={styles.card__title}>
                    <Text style={styles.card__title__txt}>{props.name}</Text>
                </View>

                <View style={styles.card__body}>
                    <Text style={styles.card__body__txt}>{props.collected + ' / ' + props.all}</Text>
                </View>
            </Card>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#565656",
        marginHorizontal: pad,
        borderRadius: pad*2.2,

        width: "95%",
        marginVertical: pad,
        padding: pad*1.5,
        paddingVertical: pad*2.2,

        flexDirection: "row"
    },
    card__title: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: pad*1.3
    },
    card__title__txt: {
        ...CommonStyles.bold_text,
        fontSize: windowHeight / 33,
        color: Colors.deep_yellow,
    },
    card__body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: pad*1.3
    },
    card__body__txt: {
        ...CommonStyles.bold_text,
        color: "white",
        fontSize: windowHeight / 35,
        fontFamily: "noto_bold",
    },

    card__button__txt: {
        color: Colors.text_grey,
        fontSize: windowHeight / 36,
        fontFamily: "noto_bold",
    },
    card__button__date: {
        color: Colors.text_grey,
        fontSize: windowHeight / 36,
        fontFamily: "noto_regular",
    },
});

export default CardButton;
