import React, { useState } from "react";
import { StyleSheet, Image, Button } from "react-native";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
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

// import signedIn from each folders
import { getIsSignedIn } from "../stored/SignedIn";

import Colors from "../constants/Colors";
import { headerOptions, logoHeaderOptions } from "../constants/Options";

const Settings = createStackNavigator();
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
        options: { title: "정보수정", ...headerOptions },
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
        options: { title: "식당이름", ...headerOptions },
    },
    Order: {
        component: OrderScreen,
        options: { title: "담은 메뉴를 확인해 주세요", ...headerOptions },
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
            <Auth.Screen name="Login" component={LoginScreen} options={logoHeaderOptions}></Auth.Screen>
            <Auth.Screen name="Signup" component={SignupScreen} options={{ title: "정보입력", ...headerOptions }}></Auth.Screen>
            <Auth.Screen name="TermsNC" component={TermsNConditionsScreen} options={{ title: "약관동의", ...headerOptions }}></Auth.Screen>
            <Auth.Screen name="CompleteRegister" component={CompleteRegisterScreen} options={{ headerShown: false }}></Auth.Screen>
        </Auth.Navigator>
    );
};

const MainStack = () => {
    return (
        <Main.Navigator initialRouteName="HomeMain">
            {Object.entries({ ...MainScreen, ...SettingsScreen }).map(([name, others]) => (
                <Main.Screen key={name} name={name} component={others.component} options={others.options} />
            ))}
        </Main.Navigator>
    );
};

const waggleNavigator = () => {
    // Main or Auth
    // |_ Settings

    const isSignedIn = true;
    return <NavigationContainer>{isSignedIn ? <MainStack></MainStack> : <AuthStack></AuthStack>}</NavigationContainer>;
};

const styles = StyleSheet.create({});

export default waggleNavigator;
