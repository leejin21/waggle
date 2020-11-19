import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { Video } from "expo-av";

import Colors from "../../constants/Colors";
import { headerOptions } from "../../constants/Options";

import { Context } from "../../navigation/Store";

import { HeartIcon } from "../../components/ListPhoto";
import { Feather } from "@expo/vector-icons";
import BottomButton from "../../components/BottomButton";
import CommonStyles from "../../constants/CommonStyles";
import ApiUrls from "../../constants/ApiUrls";

import {par2url, getHeader} from "../../fetch/fetchApi";

import Card from "../../components/Card";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const ICON_SIZE = font*2.4;

const getHeart = async (state, rest_id) => {
    // 하트의 유무 결정
    const totUrl = par2url('/main/heartchanged', {rest_id});
    const header = getHeader(state.userToken);
    try {
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
        });
        let json = await response.json();
        console.log(json);
        return json;
    } catch (e) {
        console.error(e);
    }
}

const timestamp = [
    {id:0, name: "메뉴소개", milisec: 3000},
    {id: 1, name: "먹방", milisec: 8000}
]
const TimeStamp = (props) => {
    const handleClick = () => {
        props.setPos(props.milisec);
    }

    return (
        <TouchableOpacity onPress={() => handleClick()}>
            <Card style={styles.timestamp}>
                <View style={{flexDirection: "row"}}>
                    <AntDesign name="caretright" size={font*2} color="white"></AntDesign>
                    <Text>{" "}</Text>
                </View>
                <View>
                    <Text style={styles.timestamp_txt}>{props.name}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const HeaderRight = (props) => {
    return (
        <View style={styles.header__right}>
            <HeartIcon heart_filled={props.heart_filled} style={styles.heart_icon} rest_id={props.rest_id} item={props.item}></HeartIcon>
            <TouchableOpacity style={styles.more_icon} onPress={() => {}}>
                <Feather name="more-vertical" size={ICON_SIZE} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const RestaurantVideoScreen = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const [pos, setPos] = useState(0);

    useEffect(()=> {
        const fetchHeart = async() => {
            // * get heart json
            const json = await getHeart(state, props.route.params.rest_id);
            // * set header
            await props.navigation.setOptions({
                ...headerOptions,
                headerTintColor: Colors.deep_yellow,
                headerTransparent: true,
                headerStyle: {
                    height: font*15,
                    shadowColor: "transparent",
                },
                headerTitleStyle: {
                    ...headerOptions.headerTitleStyle,
                    color: "white",
                },
                // - set header title and header right buttons
                title: props.route.params.title,
                headerRight: () => <HeaderRight item={props.route.params.item} rest_id={props.route.params.rest_id} heart_filled={json.heart_filled} ></HeaderRight>,
            });
        };
        fetchHeart();
    },[])
    

    

    return (
        <View style={styles.container}>
            <View style={styles.video__wrapper}>
                <Video
                    // TODO mp4 아닌 확장자 어떻게 할 지 고민하기
                    source={{ uri: ApiUrls.FETCH_VIDEO+props.route.params.rest_id.toString()+".mp4"}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    resizeMode="cover"
                    isLooping={false}
                    useNativeControls
                    style={Platform.OS === 'ios'? styles.video__ios : styles.video__android} 
                    // style={{ width: windowWidth, height: font*30 }}
                    positionMillis={pos}
                ></Video>
            </View>
            <View style={styles.timestamp__wrapper}>
                {timestamp.map((item) => {return <TimeStamp key={item.id} id={item.id} name={item.name} milisec={item.milisec} setPos={setPos}></TimeStamp>})}
            </View>
            <View style={styles.button__wrapper}>
                <BottomButton active={true} onPress={() => props.navigation.navigate("Basket", { title: props.route.params.title, rest_id: props.route.params.rest_id })} style_back_color={{}}>
                    <Text style={CommonStyles.bold_text}>메뉴 선택</Text>
                </BottomButton>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "pink"
    },
    video__wrapper: {
        flex: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.body_grey,
        width: "100%",
    },
    video__android: {
        width: windowWidth, height: "100%"
    },
    video__ios: {
        width: windowWidth, height: "94%", marginTop: font*4.3
    },
    button__wrapper: {
        flex: 2,
        width: "100%",
    },
    header__right: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: pad*0.5,
    },
    heart_icon: {
        margin: pad*0.5,
    },
    more_icon: {
        margin: pad*0.5,
        borderRadius: ICON_SIZE * 2,
    },

    timestamp__wrapper: {
        flex: 1.4,
        backgroundColor: Colors.body_grey,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
    },
    timestamp: {
        backgroundColor: "#565656",
        borderRadius: pad*1.7,
        margin: pad,
        marginRight: 0,
        padding: pad,
        paddingRight: pad*1.5,
        flexDirection: "row",
        alignItems: "center",
    },
    timestamp_txt: {
        color: "white",
        fontSize: font*2,
        fontFamily: "noto_bold",
    }
});

export default RestaurantVideoScreen;
