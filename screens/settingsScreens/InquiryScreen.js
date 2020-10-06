import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import CardTemplate from "../../templates/CardTemplate";

import Modal from 'react-native-modal';

function ModalTester() {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return(
          <View style={{flex: 1}}>
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

const InquiryView = () => {
    return(
        <View><ModalTester/></View>
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