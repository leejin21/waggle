// USE:: mainScreens :basket, order, finish order

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import CommonStyles from "../constants/CommonStyles";

const CheckCircle = (props) => {
    // props: SIZE, touchable
    const [checked, setChecked] = useState(false);
    const CHECK_SIZE = props.SIZE * 0.9;
    const CHECK_MARGIN_TOP = (props.SIZE * 1) / 10;

    const SIZE_STYLE = {
        height: props.SIZE,
        width: props.SIZE,
        borderRadius: props.SIZE * 2,
    };

    const CheckIcon = () => {
        return <AntDesign name="check" size={CHECK_SIZE} color={Colors.check_orange} style={{ marginTop: CHECK_MARGIN_TOP }} />;
    };

    return props.touchable === true ? (
        <TouchableHighlight
            style={{ ...styles.wrapper, ...SIZE_STYLE, backgroundColor: "white" }}
            onPress={setChecked((checked) => (checked ? false : true))}
            underlayColor={Colors.text_grey}
            activeOpacity={0.7}
        >
            {checked ? <CheckIcon></CheckIcon> : <View></View>}
        </TouchableHighlight>
    ) : (
        <View style={{ ...styles.wrapper, ...SIZE_STYLE }}>
            <CheckIcon></CheckIcon>
        </View>
    );
};
const styles = StyleSheet.create({
    wrapper: {
        ...CommonStyles.yellow_circle,
    },
});

export default CheckCircle;
