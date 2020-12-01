import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";

import ProfileLogo from "../../components/ProfileLogo";
import BottomButton from "../../components/BottomButton";

import { AuthContext } from "../../navigation/Navigator";
import { Context } from "../../navigation/Store";
import {par2url, getHeader} from "../../fetch/fetchApi";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { logoHeaderOptions } from "../../constants/Options";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const getMyInfo = async (state) => {
    // * GET user/settings
    // 상단의 이름, 전화번호 표시 위해 fetch
    if (state.userToken !== null){
        const totUrl = par2url('/user/settings', {});
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
            
    } else {
        console.log("user token not exist");
    }
}


const MyPageScreen = (props) => {
    // initialization
    const { signOut } = useContext(AuthContext);
    const [state, dispatch] = React.useContext(Context);

    // GET user/settings
    const [info, setInfo] = useState({name: "", phone_num: ""});
    
    useEffect(() => {
        const fetchInfo = async () => {
            const json = await getMyInfo(state);
            setInfo(json);
        }
        fetchInfo();
    }, []);

    // set navigation options
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerTitle: () => <ProfileLogo touchable={false} SIZE={font*7}></ProfileLogo>,
        headerTintColor: Colors.text_grey,
    });

    return (
        <View style={CommonStyles.body}>
            <View style={styles.body__middle}>
                <View style={styles.my_info}>
                    <Text style={styles.my_info__text}>{info.name}</Text>
                    <Text style={styles.my_info__text}>{info.phone_num}</Text>
                </View>
                <BottomButton onPress={() => props.navigation.navigate("Coupons", {info_name: info.name})} active={true} style_back_color={styles.mid__button}>
                    <Text style={styles.button_text}>쿠폰함</Text>
                </BottomButton>

                <BottomButton onPress={() => props.navigation.navigate("Stampbox", {info_name: info.name})} active={true} style_back_color={styles.mid__button}>
                    <Text style={styles.button_text}>스탬프함</Text>
                </BottomButton>
                <BottomButton onPress={() => props.navigation.navigate("EditInfo")} active={true} style_back_color={styles.mid__button}>
                    <Text style={styles.button_text}>정보수정</Text>
                </BottomButton>
                <BottomButton onPress={() => props.navigation.navigate("Inquiry")} active={true} style_back_color={styles.mid__button}>
                    <Text style={styles.button_text}>문의하기</Text>
                </BottomButton>
            </View>

            <View style={CommonStyles.body__end}>
                <BottomButton onPress={signOut} active={true} style_back_color={{ backgroundColor: "black" }}>
                    {/* TODO onPress 부분에서 로그아웃 진짜 설정해주기 */}
                    <Text style={styles.button_text}>로그아웃</Text>
                </BottomButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body__middle: {
        ...CommonStyles.body__middle,
        justifyContent: "flex-start",
    },
    my_info: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: pad*3,
    },
    my_info__text: {
        color: "white",
        fontSize: font*2,
        fontFamily: "noto_regular",
        margin: pad*0.2,
    },
    mid__button: {
        backgroundColor: Colors.mid_grey,
        paddingBottom: 0,
        padding: 0,
        marginBottom: pad*0.7,
        // aspectRatio: 4 / 1,
        height: Platform.OS === "ios"? "16%": "20%",
        alignItems: "center",
        justifyContent: "center"
    },
    button_text: {
        ...CommonStyles.bold_text,
        color: "white",
    },
});

export default MyPageScreen;
