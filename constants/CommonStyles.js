import { StyleSheet, Dimensions } from "react-native";

import Colors from "./Colors";

// dimensions.window.height, dimensions.window.width  
const window = Dimensions.get("window");
const pad = Dimensions.window.height / 90; //10

const DIAMETER = Dimensions.window.height / 60 ;

const CommonStyles = StyleSheet.create({
    bold_text: {
        textAlign: "center",
        fontFamily: "noto_bold",
        color: "black",
        fontSize: Dimensions.window.height / 20, //30
    },
    small_text: {
        textAlign: "center",
        fontFamily: "noto_regular",
        color: "white",
        fontSize: Dimensions.window.height / 40,
    },
    /* 안쓰이는 것 같은데?
    bottom_button: {
        backgroundColor: Colors.deep_yellow,
        padding: 40,
        paddingBottom: 45,
        width: "100%",
        // fontFamily: "noto_bold",
    },
    */
    grey_button: {
        backgroundColor: Colors.mid_grey,
        fontSize: Dimensions.window.height / 30,
        width: Dimensions.window.width * 0.7,
        aspectRatio: 5 / 1,
        padding: pad,
        borderRadius: pad*3,
        color: "white",
    },
    yellow_circle: {
        // padding, height, width, borderRadius는 따로 지정을 해줘야 편함
        height: DIAMETER,
        width: DIAMETER,
        borderRadius: DIAMETER * 2,
        backgroundColor: Colors.deep_yellow,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        paddingTop: apd,
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
