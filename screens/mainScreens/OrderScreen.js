import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const OrderButton = ({navigation}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} 
        style={styles.button} 
        onPress={() => navigation.navigate("FinishOrder")}>  
            <Text style={styles.text}>주문하기</Text>
        </TouchableOpacity>
    );
};

const OrderScreen = (props) => {
    return (
        <View>
            <OrderButton navigation={props.navigation}/>
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

export default OrderScreen;
