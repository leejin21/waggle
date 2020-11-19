import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import CheckCircle from "../../components/CheckCircle";

import { Context } from "../../navigation/Store";
import { par2url, getHeader} from "../../fetch/fetchApi";

import NoCardTemplate from "../../templates/NoCardTemplate";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const circle_size = font*9.1;
const padding_size = pad*3.3;

// check가 되면 왜 왼쪽으로 가냐
const Circle_check = () => {
    return(
        <CheckCircle SIZE={circle_size} touchable={false}></CheckCircle>
    );
}
const Circle_uncheck = () => {
    return(
        <TouchableHighlight style={{...styles.circle, backgroundColor:"white", marginRight: padding_size}}/>
    );
}

const Menu = (props) => {

    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        props.id >= 100 ? id = props.id-100 : id = props.id;

        selected?
        setSelected(false)
        :
        setSelected(true);

        props.clickMenu(id, selected);
    }

    return(
        <TouchableOpacity onPress={() => handleClick()} style={{width: circle_size + padding_size, height: circle_size + padding_size ,justifyContent:"flex-start", alignItems:"flex-start"}}>
            {selected? <Circle_check/>:<Circle_uncheck/>}
            <View style={{flexDirection:"row", borderTopWidth: pad/2, borderColor: "transparent"}}> 
                <View style={{flex: 0.5}}></View>
                <View style={{flex: 2}}>
                    <Text style={CommonStyles.small_text}>{props.name}{"\n"}{props.cost}</Text>
                </View>
                <View style={{flex: 2}}></View>
            </View>
        </TouchableOpacity>
    );
    
};

const BasketView = ({main_menu, side_menu, clickMain, clickSide}) => {
    return(
        <View style={{width:"100%", height: "100%", alignItems: "center"}}>
            <View style={{flex: 5, width: "85%", paddingHorizontal: 0}}>
                <View style={{...styles.title_view, flex: 1}}>
                    <Text style={{...CommonStyles.bold_text, fontSize: font*2.5, color: "white"}}>메인 메뉴</Text>
                </View>
                <View style={{...styles.menu_view, flex: 7, paddingHorizontal: 0}}>
                    {main_menu.map((item) => {return <Menu key={item.id} id={item.id} name={item.name} cost={item.price} clickMenu={clickMain}/>})}
                </View>
            </View>
            <View style={{flex: 4, width: "100%", alignItems: "center"}}>
                <Card style={{width: "90%", height: "100%", marginTop: 0, padding: pad*1.7, marginBottom: pad*2}}>
                    <View style={{...styles.title_view, flex:1}}>
                        <Text style={{...CommonStyles.bold_text, fontSize: font*2.5, color: Colors.deep_yellow}}>오직 와글에서만 무료!</Text>
                        <Text style={{...CommonStyles.bold_text, fontSize: font*2.5, color: "white"}}>사이드 메뉴</Text>
                    </View>
                    <View style={{...styles.menu_view, flex:2.2}}>
                        {side_menu.map((item) => {return <Menu key={item.id} id={item.id} name={item.name} cost={item.price} clickMenu={clickSide}/>})}
                    </View>
                </Card>
            </View>
        </View>
    );
}

const getMenu = async (state, params) => {
    /*
        * JSON FORM
        Array [
            Object {
                "id": 0,
                "menu_id": 1,
                "rest_id": 1,
                "name": "스무디볼",
                "price": 12000,
                "type": "main",
            },
        ...
        ]
    */
    // * GET main/menu
    console.log('======================================');
    console.log('GET main/menu');
    const totUrl = par2url('/main/menu', params);
    const header = getHeader(state.userToken)
    try {    
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
        });
        let json = await response.json();
        console.log(json);
        return json;
    } catch(error) {
        // error의 경우 뭘 return해 줄 지 고민
        console.log(error);
    }
}


const BasketScreen = (props) => {
    props.navigation.setOptions({title: props.route.params.title});
    const [state, dispatch] = React.useContext(Context);

    const [main_menu, set_main_menu] = useState([]);
    const [side_menu, set_side_menu] = useState([]);

    const [mainArray, setMainArray] = useState([]);
    const [sideArray, setSideArray] = useState([]);   
    const [totalCost, setCost] = useState(0);

    console.log("mainArray: ", mainArray);
    console.log("sideArray:", sideArray);

    useEffect(() => {
        // get main menu and side menu
        const fetchMain = async () => {
            const json = await getMenu(state, {ordered: false, rest_id: props.route.params.rest_id, type: "main"});
            await set_main_menu(json);
        }
        const fetchSide = async () => {
            const json = await getMenu(state, {ordered: false, rest_id: props.route.params.rest_id, type: "side"});
            await set_side_menu(json);
        }
        fetchMain();
        fetchSide();
    }, []);

    const clickMain = (id, selected) => { // selected 바꾸기 전에 전해줌 = 클릭 이전에 selected였는지
        if(selected){
            tmp = totalCost;
            setCost(tmp-main_menu[id].price);
            setMainArray(mainArray.filter(menu => menu.id !== id));
        }
        else{
            tmp = totalCost;
            setCost(tmp+main_menu[id].price);
            setMainArray(mainArray.concat([main_menu[id]]));
        }
    }
    const clickSide = (id, selected) => {
        const rid = id+100;

        if(selected){
            tmp = totalCost;
            setCost(tmp-side_menu[id].price);
            setSideArray(sideArray.filter(menu => menu.id !== rid))

        }
        else{
            tmp = totalCost;
            setCost(tmp+side_menu[id].price);
            setSideArray(sideArray.concat([side_menu[id]]));
        }
    }

    return(
        <NoCardTemplate
        bodyview={<BasketView main_menu={main_menu} side_menu={side_menu} clickMain={clickMain} clickSide={clickSide}/>}
        needButton={true}
        buttonname={"메뉴담기"}
        navigation={props.navigation}
        toWhere={"Order"}
        data={{mainArray: mainArray, sideArray: sideArray, totalCost: totalCost, rest_id: props.route.params.rest_id}} 
        isHeaderBlack={false}
        />
    );
}

const styles = StyleSheet.create({
    mid: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        color: "#fff",
        fontSize: font*2,
        fontWeight: "bold"
    },
    border:{
        backgroundColor: "green",
        borderBottomColor: "white",
        width: "90%"
    },

    circle: {
        height: circle_size,
        width: circle_size,
        borderRadius: circle_size * 2,
        backgroundColor: "#2E2E2E"
    },
    title_view: {
        height: "100%",
        width: "100%",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: pad*2
    },
    menu_view: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start"        
    }
}); 

export default BasketScreen;