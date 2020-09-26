// nocardtemplate 적용하기

import React, {Component, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import CheckCircle from "../../components/CheckCircle";

import NoCardTemplate from "../../templates/NoCardTemplate";

const circle_size = 93;
const padding_size = 40;

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

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false
        }
        this.handleClick = this.handleClick.bind(this); //bind 왜하는진 모르겠지만 일단 따라함;
    }
    
    handleClick = (state) => {
        this.setState({selected: state.selected? false:true});
        Alert.alert('is selected?', "! "+state.selected.toString());
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.handleClick(this.state)} style={{width: circle_size + padding_size, justifyContent:"flex-start", alignItems:"flex-start"}}>
                {this.state.selected? <Circle_check/>:<Circle_uncheck/>}
                <Text style={CommonStyles.small_text}>{this.props.name}: {this.props.cost}</Text>
            </TouchableOpacity>
        );
    }
};

const BasketView = (props) => {
    return(
        <View style={{width:"100%", height: "100%"}}>
            <View style={{flex: 5, width: "100%", paddingHorizontal: 20}}>
                <View style={{...styles.title_view, flex: 1}}>
                    <Text style={[CommonStyles.bold_text, {color: "white"}]}>메인 메뉴</Text>
                </View>
                <View style={{...styles.menu_view, flex: 7}}>
                    <Menu name="된장찌개" cost={5500}/>
                    <Menu name="김치찌개" cost={6000}/>
                </View>
            </View>
            <View style={{flex: 4, width: "100%"}}>
                <Card style={{width: "94%", height: "100%", marginTop: 0, padding: 10, marginBottom: 20, marginHorizontal: 13}}>
                    <View style={{...styles.title_view, flex:1}}>
                        <Text style={[CommonStyles.bold_text, {color: Colors.deep_yellow}]}>오직 와글에서만 무료!</Text>
                        <Text style={[CommonStyles.bold_text, {color: "white"}]}>사이드 메뉴</Text>
                    </View>
                    <View style={{...styles.menu_view, flex:2.2}}>

                        <Menu name="사이다" cost={2000}/>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const BasketScreen = (props) => {
    props.navigation.setOptions({title: props.route.params.title});

    const menu = 
    {  
        main_name: 
        ['된장찌개', 
        '김치찌개'], 
        
        main_price: 
        [5500, 
        6000], 
        
        side_name: 
        ['사이다', 
        '라면'], 
        
        side_price: 
        [2000, 
        3000]
    };

    return(
        <NoCardTemplate
        bodyview={<BasketView/>}
        needButton={true}
        buttonname={"메뉴담기"}
        navigation={props.navigation}
        toWhere={"Order"}
        data={menu}
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

    menu: {
        width: 150,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.deep_yellow
    },
    text: {
        color: "#fff",
        fontSize: 20,
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
        marginBottom: 20
    },
    menu_view: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start"        
    }
}); 

export default BasketScreen;