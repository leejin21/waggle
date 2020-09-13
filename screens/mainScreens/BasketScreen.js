import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SelectMenuButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("Order")}>  
            <Text style={styles.text}>메뉴 담기</Text>
        </TouchableOpacity>
    );
};

const BasketScreen = (props) => {
    return (
        <View>
            <SelectMenuButton navigation={props.navigation}/>
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
