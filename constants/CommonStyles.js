import { StyleSheet } from "react-native";

import Colors from "./Colors";
const CommonStyles = StyleSheet.create({
    bold_text: {
        textAlign: "center",
        fontFamily: "noto_bold",
        color: "black",
        fontSize: 30,
    },
    bottom_button: {
        backgroundColor: Colors.deep_yellow,
        padding: 40,
        paddingBottom: 45,
        width: "100%",
        // fontFamily: "noto_bold",
    },
    grey_button: {
        backgroundColor: Colors.mid_grey,
        fontSize: 20,
        width: 300,
        height: 60,
        padding: 10,
        borderRadius: 30,
        color: "white",
    },
});
export default CommonStyles;
