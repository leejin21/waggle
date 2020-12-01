// ! FIXME 1 alert 2번 표시되는 버그
// ! FIXME 2 allCompleted 제대로 동작 안하는 버그(간혹)

import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Dimensions } from "react-native";

import { Context } from "../../navigation/Store";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";

import BottomButton from "../../components/BottomButton";
import Card from "../../components/Card";
import { Pick, Menu, Star, ReviewButtonGroup } from "../../components/ReviewComps";

import {par2url, getHeader} from "../../fetch/fetchApi";
import ApiUrls from "../../constants/ApiUrls";
import {putCoupon } from "../../components/Coupon";
import postData from "../../fetch/postData";

const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;
const font = windowHeight / 87;

const getMenuData = async (state, coupon_id) => {
    const totUrl = par2url('/main/menu', {ordered: true, coupon_id});
    const header = getHeader(state.userToken);
    
    try {
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
        });
        let json = await response.json();
        console.log('GET /MAIN/MENU');
        console.log(json);
        return json;
    } catch (e) {
        console.error(e);
    }
    
};

const postReview = async (authState, coupon_id, state) => {
    /*
    * POST REVIEW
    [JSON 형식]
    data = {
        coupon: {
            coupon_id: 1,
            review_able: false
        },
        review: [
            {
                menu_id: 10,
                star_review: 1,
                salt_review: 1,
                amount_review: 1,
                other_review: 1,
            },
    }
    * review 속 변수들은 0부터 시작
    * other_review의 경우 다른 리뷰와는 달리 -1이 가능.
    */
    const data = getPostDataForm(coupon_id, state);
    const json = postData(authState, '/event/review', data);
    return json;
}

const dummyMenuData = [
    { id: 0, menu_id: "321", name: "", photo: 0 },
    { id: 1, menu_id: "320", name: "", photo: 0 },
    { id: 2, menu_id: "325", name: "", photo: 0 },
    { id: 3, menu_id: "326", name: "", photo: 0 },
];

const sliceMenuName = (name) => {
    let menu_name = name;
    if (name.length > 5) {
        // TODO 디자인팀 문의
        let m_list = name.split(" ");
        if (m_list.length === 2 && m_list[0] <= 5 && m_list[0] <= 5) {
            menu_name += m_list[0] + "\n" + m_list[1];
        } else {
            menu_name = name.slice(0, name.length / 2) + "\n" + name.slice(name.length / 2);
        }
    }
    return menu_name;
};

const allCompleted = (menuReview) => {
    // return false if 하나라도 false 있으면 else true
    for (let i = 0; i < menuReview.length; i++) {
        if (menuReview[i].complete === false) {
            if (menuReview[i].saltReview === -1 || menuReview[i].amountReview === -1) return false;
        }
    }
    return true;
};

const alert = (title, message) => {
    Alert.alert(title, message);
}

const getPostDataForm = (coupon_id, state) => {
    // * post할 data 구해주기
    const star2int = (starArr) => {
        // get starPoint as int type: not arr
        let cnt = 0;
        for (let s = 0; s<starArr.length; s++) {
            if (starArr[s] === false){
                console.log(cnt);
                return cnt;
            }
            cnt ++;
        }
    };

    return {
        coupon: {
            coupon_id: coupon_id,
            review_able: false
        },
        review: state.menuReview.map(r => {
            return {
                menu_id: r.menu_id,
                star_review: star2int(r.starPoint),
                salt_review: r.saltReview,
                amount_review: r.amountReview,
                other_review: r.otherReview
            };
        })
    };
}


const ReviewScreen = (props) => {
    props.navigation.setOptions({ title: props.route.params.title });
    const coupon_id = props.route.params.coupon_id;
    const [loaded, setLoaded] = React.useState(false);
    const [menuData, setMenuData] = React.useState(dummyMenuData);
    const [authState, authDispatch] = React.useContext(Context);

    useEffect(()=> {
        const fetchMenuData = async () => {
            const json = await getMenuData(authState, coupon_id);
            await setMenuData(json);
            await setLoaded(true);
            const setDispatch = async () => {
                dispatch({type: "UPDATE"});
            };
            await setDispatch();
        };
        fetchMenuData();
    }, []);
    
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            const menu_review = prevState.menuReview;
            switch (action.type) {
                case "UPDATE": 
                    if (menuData !== dummyMenuData){
                        return {
                            menuReview: menuData.map((x) => {
                                return {
                                    // menu: data 상에서 구분 위해(curMenu와 후에 대조)
                                    // menu_id: POST REQUEST 때
                                    menu: x.id,
                                    menu_id: x.menu_id,
                                    starPoint: [true, true, true, false, false],
                                    saltReview: -1,
                                    amountReview: -1,
                                    otherReview: -1,
                                    complete: false,
                                };
                            }),
                            curMenu: 0,
                        }
                    } else {
                        console.log("menuData not updated");
                        return prevState;
                    }
                        
                case "SWITCH_MENU":
                    // SECTION 리뷰할 메뉴
                    const salt_review = prevState.menuReview[prevState.curMenu].saltReview;
                    const amount_review = prevState.menuReview[prevState.curMenu].amountReview;
                    menu_review[prevState.curMenu] = { ...menu_review[prevState.curMenu], complete: true };

                    if (salt_review < 0 || salt_review >= 3) {
                        //! FIXME alert가 2번 중복되어서 불림...
                        alert("리뷰 미작성", "간이 적당한 지 리뷰를 남겨주세요!");
                    } else if (amount_review < 0 || amount_review >= 3) {
                        alert("리뷰 미작성", "양이 적당한 지 리뷰를 남겨주세요!");
                    } else {
                        // console.log(prevState);
                        return {
                            menuReview: menu_review,
                            curMenu: action.curMenu,
                        };
                    }
                case "STAR_CHANGE":
                    // SECTION 별점
                    const starPoint_list = menu_review[prevState.curMenu].starPoint.map((x, id) => (id <= action.star ? true : false));
                    menu_review[prevState.curMenu] = { ...menu_review[prevState.curMenu], starPoint: starPoint_list };
                    return {
                        ...prevState,
                        menuReview: menu_review,
                    };
                case "SALT_CHANGE":
                    // SECTION 간 정도 리뷰
                    menu_review[prevState.curMenu] = { ...menu_review[prevState.curMenu], saltReview: action.level };
                    return {
                        ...prevState,
                        menuReview: menu_review,
                    };
                case "AMOUNT_CHANGE":
                    // SECTION 양 정도 리뷰
                    menu_review[prevState.curMenu] = { ...menu_review[prevState.curMenu], amountReview: action.level };
                    return {
                        ...prevState,
                        menuReview: menu_review,
                    };
                case "OTHER_CHANGE":
                    // SECTION 기타 리뷰
                    menu_review[prevState.curMenu] = { ...menu_review[prevState.curMenu], otherReview: action.level };
                    return {
                        ...prevState,
                        menuReview: menu_review,
                    };
            }
        },
        {
            menuReview: dummyMenuData.map((x) => {
                return {
                    // menu: data 상에서 구분 위해(curMenu와 후에 대조)
                    // menu_id: POST REQUEST 때
                    menu: x.id,
                    menu_id: x.menu_id,
                    starPoint: [true, true, true, false, false],
                    saltReview: -1,
                    amountReview: -1,
                    otherReview: -1,
                    complete: false,
                };
            }),
            curMenu: 0,
        }
    );


    return (
        !loaded ? (
            <View style={{ ...CommonStyles.body, width: "100%" }}>
                <Text>
                    loading...
                </Text>
            </View>)
            : 
            (
            <View style={{ ...CommonStyles.body, width: "100%" }}>
                <View style={styles.body__middle}>
                    <Card style={{ ...styles.card, height: "25%", flex: 0 }}>
                        <Pick info_name={props.route.params.info_name}></Pick>
                        <FlatList
                            key={"_"}
                            data={menuData}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <Menu
                                        photo={ApiUrls.FETCH_MENU+item.photo.toString()+'.jpg'}
                                        menu_name={sliceMenuName(item.name)}
                                        dispatch={dispatch}
                                        action_type={"SWITCH_MENU"}
                                        id={item.id}
                                        active={state.curMenu == item.id ? true : false}
                                    ></Menu>
                                );
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            style={{ marginBottom: -(pad*1.5) }}
                        ></FlatList>
                    </Card>

                    <Card style={{ ...styles.card, ...styles.review__card }}>
                        <View style={styles.review__star}>
                            {state.menuReview[state.curMenu].starPoint.map((x, star_id) => {
                                const name = x ? "star" : "star-border";
                                return <Star name={name} id={star_id} key={star_id} dispatch={dispatch} action_type={"STAR_CHANGE"}></Star>;
                            })}
                        </View>

                        <View style={styles.review__section}>
                            <ReviewButtonGroup
                                tags={["싱거워요", "적당해요", "짜요"]}
                                direction="row"
                                dispatch={dispatch}
                                action_type={"SALT_CHANGE"}
                                state={state.menuReview[state.curMenu].saltReview}
                            ></ReviewButtonGroup>
                            <ReviewButtonGroup
                                tags={["양 적어요", "적당해요", "양 많아요"]}
                                direction="row"
                                dispatch={dispatch}
                                action_type={"AMOUNT_CHANGE"}
                                state={state.menuReview[state.curMenu].amountReview}
                            ></ReviewButtonGroup>
                        </View>
                        <View style={styles.review__section}>
                            <ReviewButtonGroup
                                tags={["눅눅해요", "소스가 덜 묻어있어요", "너무 식어서 왔어요", "요청이 누락됐어요"]}
                                direction="column"
                                dispatch={dispatch}
                                action_type={"OTHER_CHANGE"}
                                state={state.menuReview[state.curMenu].otherReview}
                            ></ReviewButtonGroup>
                        </View>
                    </Card>
                </View>

                <View style={CommonStyles.body__end}>
                    {allCompleted(state.menuReview) ? (
                        <BottomButton 
                            active={true} 
                            style_back_color={{ backgroundColor: Colors.deep_yellow }} 
                            onPress={() => {
                                const fetchReview = async () => {
                                    await postReview(authState, coupon_id, state);
                                }
                                fetchReview();
                                return props.navigation.goBack();
                            }}>
                            <Text style={{ ...styles.button_text, color: "black" }}>눈송슐랭 평가완료!</Text>
                        </BottomButton>
                    ) : (
                        <BottomButton active={false} style_back_color={{ backgroundColor: "black" }}>
                            <Text style={styles.button_text}>눈송슐랭 평가완료!</Text>
                        </BottomButton>
                    )}
                </View>
            </View>
                )
            
    );
};

const styles = StyleSheet.create({
    body__middle: {
        ...CommonStyles.body__middle,
        width: "100%",
        marginBottom: pad,
        justifyContent: "flex-start",
    },
    card: {
        width: "95%",
        marginTop: pad,
        marginBottom: pad,
        paddingHorizontal: pad*1.2,
        alignItems: "center",
    },
    review__card: {
        flex: 0,
        justifyContent: "center",
        paddingTop: pad*1.5,
        paddingBottom: pad*0.5,
    },
    review__star: {
        flexDirection: "row",
        marginBottom: pad,
    },
    review__section: {
        marginVertical: pad*0.3,
        width: "100%",
        alignItems: "center",
        // backgroundColor: "pink",
    },
    button_text: {
        ...CommonStyles.bold_text,
        color: Colors.light_grey,
    },
});

export default ReviewScreen;
