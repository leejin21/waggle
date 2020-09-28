// nocardtemplate 적용하기

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import CheckCircle from "../../components/CheckCircle";

import NoCardTemplate from "../../templates/NoCardTemplate";

const circle_size = 93;
const margin_size = 20;
// 반복 생성
const Menu = ({menu_name, menu_price}) => {
    return(
        <View style={{width: circle_size+margin_size, justifyContent:"flex-start", alignItems:"center"}}>
            <CheckCircle SIZE={circle_size} touchable={false}/>
            <Text style={CommonStyles.small_text}>{menu_name}</Text>
            <Text style={CommonStyles.small_text}>{''+menu_price}</Text>
        </View>   
    );
};

const OrderView = ({route}) => {
    return (
    <View style={{width: "100%", height: "100%", paddingHorizontal: 30, alignItems: "center"}}>

        <View style={{width: "93%", height: "100%", flex:2.3}}>
            <View style={{width: "100%", height: "100%", flex:1, }}>
                <View style={{...styles.title_view, width: "100%", height: "100%", flex:1, borderTopColor:"white", borderTopWidth:1, alignItems:"flex-start"}}>
                    <Text style={[CommonStyles.bold_text, {color: "white", fontSize: 25}]}> 메인 메뉴</Text>
                </View>
                <View style={{...styles.menu_view, width: "100%", height: "100%", flex:3, paddingBottom:10}}>
                    <Menu menu_name={route.params.main_name} menu_price={route.params.main_price}/>
                </View>
            </View>
            <View style={{width: "90%", height: "100%", flex:1, justifyContent:"flex-start", alignItems:"flex-start"}}>
                <View style={{...styles.title_view, width: "100%", height: "100%", flex:1, alignItems:"flex-start"}}>
                    <Text style={[CommonStyles.bold_text, {color: "white", fontSize: 25}]}>+ 사이드 메뉴</Text>
                </View>
                <View style={{...styles.menu_view, width: "100%", height: "100%", flex:3, paddingBottom:10}}>
                    <Menu menu_name={route.params.side_name} menu_price={route.params.side_price}/>  
                </View>
            </View>   
        </View>

        <View style={{width: "93%", height: "100%", flex:1}}>
        <View style={{...styles.title_view, width: "100%", height: "100%", justifyContent: "flex-start", alignItems:"flex-start", borderTopColor:"white", borderTopWidth:1, paddingTop: 10}}>
            <Text style={[CommonStyles.bold_text, {color: Colors.deep_yellow, fontSize: 44}]}> = 총합 </Text>
            <Text style={{...CommonStyles.small_text, fontSize: 13}}>  (메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
        </View>

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
    },

    title_view: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    menu_view: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start"        
    }
});

export default OrderScreen;