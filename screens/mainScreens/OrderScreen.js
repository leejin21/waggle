import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Menu = () => {
    return(

    );
};

const GoBackButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.goBack()}>  
            <Text style={styles.text}>back</Text>
        </TouchableOpacity>
    );
};

const OrderButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("FinishOrder")}>  
            <Text style={styles.text}>주문하기</Text>
        </TouchableOpacity>
    );
};

/* text인 부분 대부분 백엔드에서 or 전 화면에서 정보 읽어오는 걸로 바꿔야 */
const OrderScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <GoBackButton navigation={props.navigation}/>
                <Text style={styles.text}>담은 메뉴를 확인해 주세요</Text>
            </View>
            <View style={styles.mid}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>메인 메뉴</Text>
                    <Menu/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>+ 사이드 메뉴</Text>
                    <Menu/>  
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>= 총합 </Text>
                    <Text style={styles.text}>(메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <OrderButton navigation={props.navigation}/>
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
