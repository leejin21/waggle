import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import BottomButton from "../../components/BottomButton";

const Menu = () => {
    return(
        <Text style={styles.text}>나는 메뉴다</Text>
    );
};


const OrderButton = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>주문하기</Text>
        </BottomButton>
    );
};

/* text인 부분 대부분 백엔드에서 or 전 화면에서 정보 읽어오는 걸로 바꿔야 */
const OrderScreen = ({route, navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <View style={styles.mid}>
                <View style={styles.mid}>
                    <Text style={styles.text}>메인 메뉴</Text>
                    <Menu/>
                </View>
                <View style={styles.mid}>
                    <Text style={styles.text}>+ 사이드 메뉴</Text>
                    <Menu/>  
                </View>
                <View style={styles.mid}>
                    <Text style={styles.text}>= 총합 </Text>
                    <Text style={styles.text}>(메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <OrderButton onPress={() => navigation.navigate("FinishOrder")}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    top: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mid: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        width: "100%",
        height: 110,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: 0
    },
    touched: {
        backgroundColor: "#ee5555"
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default OrderScreen;
