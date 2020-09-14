import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Image } from "react-native";
import Colors from "../../constants/Colors";

import { logoHeaderOptions } from "../../constants/Options";
import ProfileLogo from "../../components/ProfileLogo";
import ListPhoto from "../../components/ListPhoto";

import CommonStyles from "../../constants/CommonStyles";

const imageDatas = [
    require("../../assets/images/thumbnails/bibimbap.jpg"),
    require("../../assets/images/thumbnails/meat.jpg"),
    require("../../assets/images/thumbnails/mexican.jpg"),
    require("../../assets/images/thumbnails/earlgreycake.jpg"),
];

const HomeMainScreen = (props) => {
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerRight: () => <ProfileLogo touchable={true} navigation={props.navigation}></ProfileLogo>,
    });

    return (
        <View style={styles.body}>
            <FlatList
                data={imageDatas}
                renderItem={({ item }) => {
                    return <ListPhoto source={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
            <Button title="Go to RestVideo Screen" onPress={() => props.navigation.navigate("RestVideo")}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        ...CommonStyles.body,
        flexDirection: "column",
    },
});

export default HomeMainScreen;
