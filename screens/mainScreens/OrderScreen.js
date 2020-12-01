import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import CheckCircle from "../../components/CheckCircle";

import { Context } from "../../navigation/Store";
import {par2url, getHeader} from "../../fetch/fetchApi";

import NoCardTemplate from "../../templates/NoCardTemplate";
import postData from "../../fetch/postData";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const circle_size = font*9.1;
const margin_size = pad*2;

// 반복 생성
const Menu = ({type, menu_name, menu_price}) => {
    if(type == "main"){
        return(
            <View style={{width: circle_size+margin_size, justifyContent:"flex-start", alignItems:"center"}}>
                <CheckCircle SIZE={circle_size} touchable={false}/>
                <View style={{borderTopWidth: pad/2, borderColor: "transparent"}}>
                    <Text style={CommonStyles.small_text}>{menu_name}</Text>
                    <Text style={CommonStyles.small_text}>{menu_price}₩</Text>
                </View>
            </View>   
        );
    }
    if(type == "side"){
        return(
            <View style={{width: circle_size+margin_size, justifyContent:"flex-start", alignItems:"center"}}>
                <CheckCircle SIZE={circle_size} touchable={false}/>
                <View style={{borderTopWidth: pad/2, borderColor: "transparent"}}>
                    <Text style={CommonStyles.small_text}>{menu_name}</Text>
                    <Text style={{...CommonStyles.small_text, textDecorationLine: 'line-through'}}> {menu_price}₩</Text>
                    <Text style={{...CommonStyles.small_text, color: Colors.deep_yellow}}>{"0₩"}</Text>
                </View>
            </View>   
        );
    }
};

const OrderView = ({route}) => { 
    //mainArray, sideArray , mainCost, sideCost
    //menuArray: [{id, menu_id, name, price, rest_id, type}]
    const mainArray = route.params.mainArray;
    const sideArray = route.params.sideArray;

    const mainCost = route.params.mainCost;
    const sideCost = route.params.sideCost;

    return (
    <View style={styles.view1}>
        <View style={styles.view2_1}>
            <View style={styles.view3_1}>
                <View style={[styles.title_view, styles.view4_1]}>
                    <Text style={[CommonStyles.bold_text, styles.txt1]}> 메인 메뉴</Text>
                </View>
                <View style={[styles.menu_view, styles.view4_2]}>
                    {mainArray.map((item) => {return <Menu type={"main"} key={item.id} menu_name={item.name} menu_price={item.price}/>})}
                </View>
            </View>
            <View style={styles.view3_2}>
                <View style={[styles.title_view, styles.view4_3]}>
                    <Text style={[CommonStyles.bold_text, styles.txt1]}>+ 사이드 메뉴</Text>
                </View>
                <View style={[styles.menu_view, styles.view4_4]}>
                    {sideArray.map((item) => {return <Menu type={"side"} key={item.id} menu_name={item.name} menu_price={item.price}/>})}
                </View>
            </View>   
        </View>

        <View style={styles.view2_2}>
            <View style={[styles.title_view, styles.view3_3]}>
                <Text style={[CommonStyles.bold_text, styles.txt2]}>= 총합 {mainCost}₩</Text>
                <Text style={[CommonStyles.small_text, styles.txt3]}>(메인 메뉴 {mainCost}₩ + 사이드 메뉴 {0}₩) </Text>
            </View>
        </View>
    </View>

    );
}


const postCoupon = async (state, rest_id, mainArray, sideArray) => {
    
    /*
        * POST event/coupon
        [JSON FORM]
        {
            type: "G",
            rest_id: 1,
            menus: [1, 3]
        }
    */
    
    let menus = mainArray.map(m => m.menu_id);
    menus = menus.concat(sideArray.map(m => m.menu_id));

    const data = {
            type: "G", 
            rest_id: rest_id,
            menus
    };
    await postData(state, '/event/coupon', data);
};



const OrderScreen = (props) => {
    // route
    // orderView: mainArray, sideArray , totalCost
    // orderscreen: rest_id
    const [state, dispatch] = React.useContext(Context);

    const buttonFetch = () => {
        const fetchCoupon = async () => {
            await postCoupon(state, props.route.params.rest_id, props.route.params.mainArray, props.route.params.sideArray);
        };
        fetchCoupon();
    };
    return(
        <NoCardTemplate
        bodyview={<OrderView route={props.route}/>}
        needButton={true}
        buttonname={"주문하기"}
        toWhere={"FinishOrder"}
        buttonFetch={buttonFetch}
        navigation={props.navigation}
        isHeaderBlack={true}
        />
    );
}

const styles = StyleSheet.create({
    view1: {width: "100%", height: "100%", paddingHorizontal: pad*3, alignItems: "center"},
    view2_1: {width: "98%", height: "100%", flex:2.3},
    view3_1: {width: "100%", height: "100%", flex:0.9, },
    view3_2: {width: "90%", height: "100%", flex:1.1, justifyContent:"flex-start", alignItems:"flex-start"},
    view4_1: {width: "100%", height: "100%", flex:1, borderTopColor:"white", borderTopWidth:1, alignItems:"flex-start"},
    view4_2: {width: "100%", height: "100%", flex:3, paddingBottom:pad},
    view4_3: {width: "100%", height: "100%", flex:1, alignItems:"flex-start"},
    view4_4: {width: "100%", height: "100%", flex:3, paddingBottom:pad},
    view2_2: {width: "98%", height: "100%", flex:1},
    view3_3: {width: "100%", height: "100%", justifyContent: "flex-start", alignItems:"flex-start", borderTopColor:"white", borderTopWidth:1, paddingTop: pad},
    txt1: {color: "white", fontSize: font*2.5},
    txt2: {color: Colors.deep_yellow, fontSize: font*4.4},
    txt3: {fontSize: font*1.3},


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
        paddingHorizontal: pad*5
    },
    f2: {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
    },

    text: {
        color: "#fff",
        fontSize: font*2,
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