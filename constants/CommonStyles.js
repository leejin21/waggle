import { StyleSheet } from "react-native";

import Colors from "./Colors";

const DIAMETER = 60;

const CommonStyles = StyleSheet.create({
    bold_text: {
        textAlign: "center",
        fontFamily: "noto_bold",
        color: "black",
        fontSize: 30,
    },
    small_text: {
        margin: 5,
        textAlign: "center",
        fontFamily: "noto_regular",
        color: "white",
        fontSize: 15,
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
    yellow_circle: {
        // padding, height, width, borderRadius는 따로 지정을 해줘야 편함
        //padding: 3,
        //margin: 5,
        height: DIAMETER,
        width: DIAMETER,
        borderRadius: DIAMETER * 2,
        backgroundColor: Colors.deep_yellow,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        paddingTop: 10,
        backgroundColor: Colors.body_grey,
        flex: 1,
    },
    body__middle: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    body__end: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default CommonStyles;
