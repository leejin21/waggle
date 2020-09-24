// nocardtemplate 적용하기

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import CheckCircle from "../../components/CheckCircle";

import NoCardTemplate from "../../templates/NoCardTemplate";

// 반복 생성
const Menu = ({menu_name, menu_price}) => {
    return(
        <View>
            <CheckCircle SIZE={80} touchable={false}/>
            <Text style={styles.text}>{menu_name}</Text>
            <Text style={styles.text}>{''+menu_price}</Text>
        </View>   
    );
};

const OrderView = ({route}) => {
    return (
        <View style={{width: "100%", height: "100%"}}>
        <View style={{width: "100%", height: "100%", flex:2}}>
            <View style={{width: "100%", height: "100%", flex:1}}>
                <Text style={[CommonStyles.bold_text, {color: "white"}]}>메인 메뉴</Text>
                <Menu menu_name={route.params.main_name} menu_price={route.params.main_price}/>
            </View>
            <View style={{width: "100%", height: "100%", flex:1}}>
                 <Text style={[CommonStyles.bold_text, {color: "white"}]}>+ 사이드 메뉴</Text>
                <Menu menu_name={route.params.side_name} menu_price={route.params.side_price}/>  
            </View>   
        </View>

        <View style={{width: "100%", height: "100%", flex:1}}>
            <Text style={[CommonStyles.bold_text, {color: Colors.deep_yellow}]}>= 총합 </Text>
            <Text style={styles.text}>(메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
        </View>
    </View>

    );
}

const OrderScreen = (props) => {
    return(
        <NoCardTemplate
        bodyview={<OrderView route={props.route}/>}
        needButton={true}
        buttonname={"주문하기"}
        toWhere={"FinishOrder"}
        navigation={props.navigation}
        isHeaderBlack={true}
        />
    );
}

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