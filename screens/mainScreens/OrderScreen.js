import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import CheckCircle from "../../components/CheckCircle";
import BottomButton from "../../components/BottomButton";

const Menu = () => {
    return(
        <View>
            <CheckCircle SIZE={80} touchable={false}/>
            <Text style={styles.text}>나는 메뉴다</Text>
        </View>   
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
        <View style={CommonStyles.body}>
            <View style={CommonStyles.body__middle}>
                <View style={styles.f2}>
                    <View style={styles.f1}>
                        <Text style={[CommonStyles.bold_text, {color: "white"}]}>메인 메뉴</Text>
                        <Menu/>
                    </View>
                    <View style={styles.f1}>
                         <Text style={[CommonStyles.bold_text, {color: "white"}]}>+ 사이드 메뉴</Text>
                        <Menu/>  
                    </View>   
                </View>
                <View style={styles.f1}>
                    <Text style={[CommonStyles.bold_text, {color: Colors.deep_yellow}]}>= 총합 </Text>
                    <Text style={styles.text}>(메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
                </View>
            </View>
            <View style={CommonStyles.body__end}>
                <OrderButton onPress={() => navigation.navigate("FinishOrder")}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    mid: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    f1: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        paddingHorizontal: 50
    },
    f2: {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
    },

    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default OrderScreen;
