import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import CardTemplate from "../../templates/CardTemplate";

import Modal from 'react-native-modal';
import Card from "../../components/Card";
import ModalButton from "../../components/ModalButton";

/*
function ModalTester() {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return(
          <View style={{flex: 1, width: "100%", height: "100%", backgroundColor: "green"}}>
            <Button title="Show modal" onPress={toggleModal} />
    
            <Modal isVisible={isModalVisible}>
              <View style={{flex: 1}}>
                <Text>Hello!</Text>
    
                <Button title="Hide modal" onPress={toggleModal} />
              </View>
            </Modal>
          </View>
        );
    }
    */

const InquiryView = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return(
        <View>
            <Button title="show modal" onPress={toggleModal}/>
            <Modal isVisible={isModalVisible}>
                <Card> 
                    <Button title="hide modal" onPress={toggleModal}/>
                    <ModalButton style={{backgroundColor:"black"}}/>
                </Card>               
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

});

export default InquiryScreen;