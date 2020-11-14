import React from "react";
import { Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


// import screens from each folders
import CompleteRegisterScreen from "../screens/authScreens/CompleteRegisterScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";
import SignupScreen from "../screens/authScreens/SignupScreen";
import TermsNConditionsScreen from "../screens/authScreens/TermsNConditionsScreen";

import HomeMainScreen from "../screens/mainScreens/HomeMainScreen";
import BasketScreen from "../screens/mainScreens/BasketScreen";
import OrderScreen from "../screens/mainScreens/OrderScreen";
import RestaurantVideoScreen from "../screens/mainScreens/RestaurantVideoScreen";
import FinishOrderScreen from "../screens/mainScreens/FinishOrderScreen";

import CouponsScreen from "../screens/settingsScreens/CouponsScreen";
import EditInfoScreen from "../screens/settingsScreens/EditInfoScreen";
import MyPageScreen from "../screens/settingsScreens/MyPageScreen";
import StampboxScreen from "../screens/settingsScreens/StampboxScreen";
import StamptoCouponScreen from "../screens/settingsScreens/StamptoCouponScreen";
import InquiryScreen from "../screens/settingsScreens/InquiryScreen";
import ReviewScreen from "../screens/settingsScreens/ReviewScreen";


import Colors from "../constants/Colors";
import { headerOptions, logoHeaderOptions, reviewOptions } from "../constants/Options";

import {Context} from "./Store";
import Navigator from "./Navigator";


const windowHeight = Dimensions.get("window").height;
const font = windowHeight / 87;


const Auth = createStackNavigator();
const Main = createStackNavigator();

const SettingsScreen = {
    // screens/settingsScreens 에 해당하는 설정 화면들
    MyPage: {
        component: MyPageScreen,
        options: { title: "마이페이지" },
    },
    Coupons: {
        component: CouponsScreen,
        options: { title: "쿠폰함" },
    },

    EditInfo: {
        component: EditInfoScreen,
        options: { title: "정보수정" },
    },
    Stampbox: {
        component: StampboxScreen,
        options: { title: "스탬프함" },
    },
    StampCoupon: {
        component: StamptoCouponScreen,
    },
    Inquiry: {
        component: InquiryScreen,
        options: { title: "문의하기" },
    },
    Review: {
        component: ReviewScreen,
        options: reviewOptions,
        // options: title: setOptions로 ReviewScreen에서.
    },

};

const MainScreen = {
    // screens/mainScreens 에 해당하는 메인 화면들
    HomeMain: {
        component: HomeMainScreen,
        options: {},
    },
    Basket: {
        component: BasketScreen,
        options: { ...headerOptions, 
            headerTintColor: Colors.deep_yellow,  
            headerStyle: {...headerOptions.headerStyle, backgroundColor: Colors.body_grey, height: font*12.2}},
    },
    Order: {
        component: OrderScreen,
        options: { title: "담은 메뉴를 확인해 주세요", ...headerOptions,
            headerTintColor: Colors.deep_yellow,  
            headerStyle: {...headerOptions.headerStyle, backgroundColor: Colors.body_grey}},
    },
    RestVideo: {
        component: RestaurantVideoScreen,
        options: {},
    },
    FinishOrder: {
        component: FinishOrderScreen,
        options: { headerShown: false },
    },
};

const AuthStack = () => {
    return (
        <Auth.Navigator initialRouteName="Login">
            <Auth.Screen name="Login" component={LoginScreen} options={{...logoHeaderOptions, headerTitleAlign: "center"}}></Auth.Screen>
            <Auth.Screen name="Signup" component={SignupScreen} options={{ title: "정보입력", ...headerOptions, headerTitleAlign: "center" }}></Auth.Screen>
            <Auth.Screen name="TermsNC" component={TermsNConditionsScreen} options={{ title: "약관동의", ...headerOptions, headerTitleAlign: "center" }}></Auth.Screen>
            <Auth.Screen name="CompleteRegister" component={CompleteRegisterScreen} options={{ headerShown: false }}></Auth.Screen>
        </Auth.Navigator>
    );
};

const MainStack = () => {
    return (
        <Main.Navigator initialRouteName="HomeMain">
            {Object.entries({ ...MainScreen, ...SettingsScreen }).map(([name, others]) => (
                <Main.Screen key={name} name={name} component={others.component} options={{...others.options, headerTitleAlign: "center"}} />
            ))}
        </Main.Navigator>
    );
};

const waggleNavigator = () => {
    // Main or Auth
    // |_ Settings
    
    const [state, dispatch] = React.useContext(Context);
    return (
        <Navigator>
            <NavigationContainer>{state.userToken === null ? <AuthStack></AuthStack> : <MainStack></MainStack>}</NavigationContainer>
        </Navigator>
    );
};

export default waggleNavigator;
