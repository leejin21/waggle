// USE:: auth screens: register, complete resgister
//    :: settings screens: my page, edit info
//    :: main screens: home main
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import CommonStyles from "../constants/CommonStyles";
import Colors from "../constants/Colors";

// const DIAMETER = 60;

const ProfileLogo = (props) => {
    // props: touchable, navigation
    return props.touchable === true ? (
        <TouchableHighlight
            style={{ ...CommonStyles.yellow_circle, ...props.style }}
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
    ) : (
        <View style={CommonStyles.yellow_circle}>
            <Text style={styles.profile__text}>MY</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    profile__text: {
        fontSize: 20,
        fontFamily: "noto_bold",
    },
});

export default ProfileLogo;
