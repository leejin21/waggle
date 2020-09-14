import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const ITEM_WIDTH = Dimensions.get("window").width;

const ListPhoto = (props) => {
    return (
        <View style={styles.wrapper}>
            <Image source={props.item} style={styles.photo} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    photo: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 2,
        resizeMode: "stretch",
    },
});

export default ListPhoto;
