import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";
import { Context } from "../../navigation/Store";

import Coupon, { StampCoupon } from "../../components/Coupon";

import {par2url, getHeader} from "../../fetch/fetchApi";


const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const getCouponDatas = async (state) => {
    // event/coupon GET
    /*
    * JSON FORM
    [
        { 
            name: "ABC레스토랑",
            type: "G",
            content: "A, E and A",
            usable: true,
            review_able: true,
            useDate: "2020.08.26 12:53 PM"
        },
        ...
    ]
    */
    const totUrl = par2url('/event/coupon', {});
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
};


const CouponsScreen = (props) => {
    // ! [Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'props.route.params.info_name')]
    // ! StamptoCouponScreen => CouponsScreen에서 props.route.params에 info_name이 없음.
    // TODO 해결: MyPageScreen에서 info_name, info_phone Context로 뿌려서 Global하게 가지고 있기
    const [state, dispatch] = React.useContext(Context);
    const [couponDatas, setCouponDatas] = useState([]);

    useEffect(() => {
            const fetchCoupons = async () => {
                const json = await getCouponDatas(state);
                await setCouponDatas(json);
            };
            fetchCoupons();
    }, []);

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
            <View style={styles.exp_text__wrapper}>
                <Text style={styles.exp_text}>실수로 사이드메뉴 증정권 버튼을 눌렀을 시,{"\n"}X를 눌러 주문 취소 후 다시 주문해 주세요.</Text>
                <Text style={{ ...styles.exp_text, color: Colors.deep_yellow }}>단, 스탬프 완료 쿠폰은 다시 발급이 불가합니다.</Text>
            </View>
            <FlatList
                key="_"
                data={couponDatas}
                renderItem={({ item }) => {
                    if (item.type === "S") {
                        return <StampCoupon coupon_id={item.coupon_id} name={item.name} content={item.content} usable={item.usable} useDate={item.useDate} ICON_SIZE={font*5}></StampCoupon>;
                    } else {
                        return (
                            <Coupon
                                info_name={props.route.params.info_name}
                                coupon_id={item.coupon_id} 
                                name={item.name}
                                content={item.content}
                                usable={item.usable}
                                review_able={item.review_able}
                                useDate={item.useDate}
                                ICON_SIZE={font*5}
                                navigation={props.navigation}
                            ></Coupon>
                        );
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
                style={{ width: "100%" }}
            ></FlatList>
        </View>
    );
};
const styles = StyleSheet.create({
    // CouponsScreen comp의 styles
    body: {
        ...CommonStyles.body,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },
    exp_text__wrapper: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: pad*1.5,
    },
    exp_text: {
        color: "white",
        fontSize: font*1.6,
        fontFamily: "noto_bold",
        textAlign: "center",
    },
});

export default CouponsScreen;
