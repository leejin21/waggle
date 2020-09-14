import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../constants/Colors";

const ProfileLogo = (props) => {
    var Wrapper = () => (
        <View style={styles.profile__wrapper}>
            <Text style={styles.profile__text}>MY</Text>
        </View>
    );
    if (props.touchable === true) {
        Wrapper = () => (
            <TouchableHighlight
                style={styles.profile__wrapper}
                onPress={() =>
                    props.navigation.navigate("Settings", {
                        name: "MyPage",
                    })
                }
                underlayColor={Colors.dark_orange}
                activeOpacity={0.7}
            >
                <Text style={styles.profile__text}>MY</Text>
            </TouchableHighlight>
        );
    }
    return <Wrapper></Wrapper>;
};
const styles = StyleSheet.create({
    profile__wrapper: {
        padding: 3,
        height: 60,
        width: 60,
        borderRadius: 120,
        backgroundColor: Colors.deep_yellow,
        margin: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    profile__text: {
        fontSize: 20,
        fontFamily: "noto_bold",
    },
});

export default ProfileLogo;
