import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

/* container & presentational components
backend, Menu와 연결해야 함

class MenuContainer extends React.Component {
    constructor(){
        super();
        this.state = { name:[], cost:[] }
    }

    componentDidMount(){
        fetchMenu(name => this.setState({name}));
        fetchMenu(cost => this.setState({cost}));
    }

    render(){
        return <Menu name={this.state.name} cost={this.state.cost}/>
    }
}
*/

const Menu = () => {
    return(
        <Text style={styles.text}>나는 메뉴다</Text>
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

const SelectMenuButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("Order")}>  
            <Text style={styles.text}>메뉴 담기</Text>
        </TouchableOpacity>
    );
};

/* text인 부분 대부분 백엔드에서 정보 읽어오는 걸로 바꿔야 */
const BasketScreen = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <GoBackButton navigation={props.navigation}/>
                <Text style={styles.text}>ABC 레스토랑</Text>
            </View>
            <View style={styles.mid}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>메인 메뉴</Text>
                    <Menu/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>오직 와글에서만 무료!</Text>
                    <Text style={styles.text}>사이드 메뉴</Text>
                    <Menu/>
                </View>
            </View>
            <View style={styles.bottom}>
                <SelectMenuButton navigation={props.navigation}/>
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

export default BasketScreen;
