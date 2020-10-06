import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import CardTemplate from "../../templates/CardTemplate";

import Modal from 'react-native-modal';
import Card from "../../components/Card";
import ModalButton from "../../components/ModalButton";

const InquiryView = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const navi = props.navigation; 

    return(
        <View>
            <Button title="show modal" onPress={toggleModal}/>
            <Modal isVisible={isModalVisible}>
                <View style={{flex:1}}><Button title="hide modal" onPress={toggleModal}/></View>

                <Card style={{padding: 10, marginHorizontal: 0, flex:1, alignItems:"center", justifyContent: "center"}}> 
                    <View style={styles.title__view}>
                        <Text style={styles.title__txt}>스탬프 완료쿠폰 발급 완료!</Text>
                    </View>
                    <View style={styles.body__view}>
                        <View style={styles.body_title__view}>
                            <Text style={styles.body_title__txt}>ABC 레스토랑 - A메뉴</Text>
                        </View>
                        <View style={styles.body_exp__view}>
                            <Text style={styles.body_exp__txt}>[마이페이지] - [쿠폰함]에 지급되었어요!{"\n"}스탬프 완료쿠폰은 재지급이 불가합니다.</Text>
                        </View>
                    </View>
                    <View style={{flex:1, width:"100%", height:"100%", paddingHorizontal: 6, paddingVertical:8}}>
                        <ModalButton navigation={navi}/>
                    </View>
                </Card>   

                <View style={{flex:1}}/>            
            </Modal>
        </View>
    );
}

const InquiryScreen = (props) => {
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
        <CardTemplate
        cardview={<InquiryView></InquiryView>}
        buttonname={"전송하기"}
        toWhere={"HomeMain"} // 일단 main화면으로
        navigation={props.navigation}
        isFullcard={true}
        />
    );
}

const styles = StyleSheet.create({
    title__view: {
        width: "90%", 
        height: "100%", 
        flex:1, 
        borderBottomColor:"white", 
        borderBottomWidth:1, 
        alignItems:"center",
        justifyContent: "center"
    },
    title__txt: {
        color: Colors.deep_yellow,
        fontSize: 28,
        fontFamily: "noto_bold",
    },

    body__view: {
        width: "100%", 
        height: "100%", 
        flex:2, 
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: 40
    },
    body_title__view: {
        width: "100%", 
        height: "100%", 
        flex:2, 
        alignItems:"center",
        justifyContent: "center"
    },
    body_title__txt: {
        color: "white",
        fontSize: 25,
        fontFamily: "noto_bold",
    },
    body_exp__view: {
        width: "100%", 
        height: "100%", 
        flex:1, 
        alignItems:"center",
        justifyContent: "center"
    },
    body_exp__txt: {
        color: "white",
        fontSize: 15,
        fontFamily: "noto_regular",
    },
});

export default InquiryScreen;