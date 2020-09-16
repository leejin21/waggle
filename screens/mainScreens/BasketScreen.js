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

const SelectMenuButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("Order")}>  
            <Text style={styles.text}>메뉴 담기</Text>
        </TouchableOpacity>
    );
};

/* menu를 백엔드에서 읽어오고, OrderScreen으로 넘기는 작업 해야 */
class BasketScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.top}></View>
                <View style={styles.mid}>
                    <View style={styles.mid}>
                        <Text style={styles.text}>메인 메뉴</Text>
                        <Menu name="된장찌개" cost={5500}/>
                        <Menu name="김치찌개" cost={6000}/>
                    </View>
                    <View style={styles.mid}>
                        <Text style={styles.text}>오직 와글에서만 무료!</Text>
                        <Text style={styles.text}>사이드 메뉴</Text>
                        
                    </View>
                </View>
                <View style={styles.bottom}>
                    <SelectMenuButton navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }
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
    menu: {
        width: 150,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green"
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

export default BasketScreen;
