import React, {Component, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import Card from "../../components/Card";
import BottomButton from "../../components/BottomButton";

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
            <TouchableOpacity style={styles.menu}
            onPress={() => this.handleClick(this.state)}>
                <Text style={styles.text}>{this.props.name}: {this.props.cost}</Text>
            </TouchableOpacity>
        );
    }
};

const SelectMenuButton = (props) => {
    return(
        <BottomButton active={true} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>메뉴담기</Text>
        </BottomButton>
    );
};
/* menu를 백엔드에서 읽어오고, OrderScreen으로 넘기는 작업 해야 */
class BasketScreen extends Component{
    constructor(props){
        super(props);
        props.navigation.setOptions({title: props.route.params.title});
    }

    render(){
        return (
            <View style={CommonStyles.body}>
                <View style={CommonStyles.body__middle}>
                    <View style={styles.mid}>
                        <View style={styles.mid}>
                            <Text style={[CommonStyles.bold_text, {color: "white"}]}>메인 메뉴</Text>
                            <Menu name="된장찌개" cost={5500}/>
                            <Menu name="김치찌개" cost={6000}/>
                        </View>
                        <View style={styles.mid}>
                            <Card>
                                <Text style={[CommonStyles.bold_text, {color: Colors.deep_yellow}]}>오직 와글에서만 무료!</Text>
                                <Text style={[CommonStyles.bold_text, {color: "white"}]}>사이드 메뉴</Text>
                            </Card>
                        </View>
                    </View>
                </View>
                <View style={CommonStyles.body__end}>
                    <SelectMenuButton onPress={() => 
                        this.props.navigation.navigate("Order", 
                        {   //label 배열도 만들어서 hotspot으로 
                            //(select되는 경우 그 메뉴 index와 일치하는 label 배열 값 selected(bool)로 바꾸기)
                            //
                            //Menu의 handleClick에서 조절돼야 함
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
                        })}/>
                </View>
            </View>
        );
    }
};
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
        backgroundColor: "green"
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default BasketScreen;
