import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import ProfileLogo from "../../components/ProfileLogo";
import BottomButton from "../../components/BottomButton";
import { AuthContext } from "../../navigation/WaggleNavigator";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { logoHeaderOptions } from "../../constants/Options";

const MyPageScreen = (props) => {
    const { signOut } = useContext(AuthContext);

    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerTitle: (props) => <ProfileLogo touchable={false} SIZE={70}></ProfileLogo>,
        headerTintColor: Colors.text_grey,
    });
    return (
        <View style={CommonStyles.body}>
            <View style={styles.body__middle}>
                <View style={styles.my_info}>
                    {/* TODO 여기 본인 프로필 fetch해 오던지 아니면 asyncstorage에 저장해두던 지 */}
                    <Text style={styles.my_info__text}>김눈송</Text>
                    <Text style={styles.my_info__text}>010-0000-0000</Text>
                </View>
                <BottomButton onPress={() => props.navigation.navigate("Coupons")} active={true} style_back_color={styles.mid__button}>
                    <Text style={styles.button_text}>쿠폰함</Text>
                </BottomButton>

                <BottomButton onPress={() => props.navigation.navigate("Stampbox")} active={true} style_back_color={styles.mid__button}>
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
        marginBottom: 30,
    },
    my_info__text: {
        color: "white",
        fontSize: 20,
        fontFamily: "noto_regular",
        margin: 2,
    },
    mid__button: {
        backgroundColor: Colors.mid_grey,
        paddingBottom: 35,
        padding: 35,
        marginBottom: 7,
    },
    button_text: {
        ...CommonStyles.bold_text,
        color: "white",
    },
});

export default MyPageScreen;
