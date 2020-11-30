//CardTemplate 배껴옴
//stampcouponscr용

import React, {useState} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";

import Colors from "../constants/Colors";
import CommonStyles from "../constants/CommonStyles";
import Card from "../components/Card";
import BottomButton from "../components/BottomButton";

import Modal from 'react-native-modal';
import ModalButton from "../components/ModalButton";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 60;

const BottomButton_2 = (props) => {
    return(
        <BottomButton active={props.active} onPress={props.onPress}>
            <Text style={{ ...CommonStyles.bold_text, color: "black" }}>{props.name}</Text>
        </BottomButton>
    );
};

const CardTemplate_modal = (props) => {   
    // props; 
    // (default) cardview, buttonname, toWhere, navigation, modal_title, button_active
    // detailtxt, card_flex (detail부분이 1), card_padding

    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const navi = props.navigation; 
    const title = props.modal_title;

    return(
        <View style={{...CommonStyles.body, width: "100%"}}>
            <View style={{ ...CommonStyles.body__middle, width: "100%" }}>
                <View style={{...CommonStyles.body, width: "100%"}}>
                    <Text style={CommonStyles.small_text}>
                        {props.detailtxt}
                    </Text>
                </View>
                <View style={{ ...CommonStyles.body__middle, width: "100%", flex: props.card_flex }}>
                    <Card style={{width:"95%", marginBottom: pad*1.5, marginTop: 0, padding: props.card_padding}}>
                        <ImageBackground source={require('../assets/images/backimg.png')} style={styles.image}>
                            {props.cardview}
                        </ImageBackground>
                    </Card>
                </View>
            </View>
            <View style={{ ...CommonStyles.body__end, width: "100%" }}>
                <BottomButton_2 name={props.buttonname} onPress={toggleModal} active={props.button_active}/>
            </View>

            <Modal isVisible={isModalVisible}>
                <View style={{flex:1}}/>
                <Card style={{padding: pad, marginHorizontal: 0, flex:1, alignItems:"center", justifyContent: "center"}}> 
                    <View style={styles.title__view}>
                        <Text style={styles.title__txt}>스탬프 완료쿠폰 발급 완료!</Text>
                    </View>
                    <View style={styles.body__view}>
                        <View style={styles.body_title__view}>
                            <Text style={styles.body_title__txt}>{title} - A메뉴</Text>
                        </View>
                        <View style={styles.body_exp__view}>
                            <Text style={styles.body_exp__txt}>[마이페이지] - [쿠폰함]에 지급되었어요!{"\n"}스탬프 완료쿠폰은 재지급이 불가합니다.</Text>
                        </View>
                    </View>
                    <View style={{flex:1, width:"100%", height:"100%", paddingHorizontal: pad*0.6, paddingVertical: pad*0.8}}>
                        <ModalButton navigation={navi} toggle={toggleModal}/>
                    </View>
                </Card>
                <View style={{flex:1}}/>
            </Modal>
        </View>
    );
};

export default CardTemplate_modal;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },

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
        fontSize: windowHeight / 30,
        fontFamily: "noto_bold",
    },

    body__view: {
        width: "100%", 
        height: "100%", 
        flex:2, 
        alignItems:"center",
        justifyContent: "center",
        paddingHorizontal: pad
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
        fontSize: windowHeight / 32,
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
        fontSize: windowHeight / 58,
        fontFamily: "noto_regular",
    },
});