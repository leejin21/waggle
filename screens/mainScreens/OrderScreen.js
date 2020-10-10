// nocardtemplate 적용하기

import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    //mainArray, sideArray 
    //[{id, name, price}]
    return (
    <View style={styles.view1}>
        <View style={styles.view2_1}>
            <View style={styles.view3_1}>
                <View style={styles.title_view, styles.view4_1}>
    <Text style={CommonStyles.bold_text, styles.txt1}> 메인 메뉴</Text>
                </View>
                <View style={styles.menu_view, styles.view4_2}>
                    <Menu menu_name={route.params.name[1]} menu_price={route.params.price}/>
                </View>
            </View>
            <View style={styles.view3_2}>
                <View style={styles.title_view, styles.view4_3}>
                    <Text style={styles.txt1}>+ 사이드 메뉴</Text>
                </View>
                <View style={styles.menu_view, styles.view4_4}>
                    <Menu menu_name={route.params.side_name} menu_price={route.params.side_price}/>  
                </View>
            </View>   
        </View>

        <View style={styles.view2_2}>
            <View style={styles.title_view, styles.view3_3}>
                <Text style={CommonStyles.bold_text, styles.txt2}> = 총합 </Text>
                <Text style={CommonStyles.small_text, styles.txt3}>  (메인 메뉴 얼마 + 사이드 메뉴 얼마) </Text>
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
    view1: {width: "100%", height: "100%", paddingHorizontal: 30, alignItems: "center"},
    view2_1: {width: "93%", height: "100%", flex:2.3},
    view3_1: {width: "100%", height: "100%", flex:1, },
    view3_2: {width: "90%", height: "100%", flex:1, justifyContent:"flex-start", alignItems:"flex-start"},
    view4_1: {width: "100%", height: "100%", flex:1, borderTopColor:"white", borderTopWidth:1, alignItems:"flex-start"},
    view4_2: {width: "100%", height: "100%", flex:3, paddingBottom:10},
    view4_3: {width: "100%", height: "100%", flex:1, alignItems:"flex-start"},
    view4_4: {width: "100%", height: "100%", flex:3, paddingBottom:10},
    view2_2: {width: "93%", height: "100%", flex:1},
    view3_3: {width: "100%", height: "100%", justifyContent: "flex-start", alignItems:"flex-start", borderTopColor:"white", borderTopWidth:1, paddingTop: 10},
    txt1: {color: "white", fontSize: 25},
    txt2: {color: Colors.deep_yellow, fontSize: 44},
    txt3: {fontSize: 13},


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