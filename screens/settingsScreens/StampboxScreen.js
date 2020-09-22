import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import CardButton from "../../components/CardButton";

const stampDatas = [
    { name: "ABC레스토랑", collected: '2', all: '10'},
    { name: "가나다레스토랑", collected: '1', all: '10'}
]

const StampboxScreen = (props) => {
    props.navigation.setOptions({
        ...headerOptions,
        headerTintColor: Colors.text_grey,
        headerStyle: {
            ...headerOptions.headerStyle,
            backgroundColor: Colors.mid_grey,
        },
        headerTitleStyle: {
            ...headerOptions.headerTitleStyle,
            color: "white",
        },
    });

    return (
        <View style={styles.body}>
            <Text style={styles.exp_text}>클릭시 상세 정보를 알 수 있어요.</Text>
            <FlatList
                key="_"
                data={stampDatas}
                renderItem={({ item }) => {
                    return <CardButton name={item.storeName} collected={item.collected} all={item.all}></CardButton>;
                }}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: "100%" }}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default StampboxScreen;