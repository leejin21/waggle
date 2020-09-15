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

const SettingsStack = () => {
    return (
        <Settings.Navigator initialRouteName="MyPage">
            <Settings.Screen name="MyPage" component={MyPageScreen}></Settings.Screen>
            <Settings.Screen name="Coupons" component={CouponsScreen}></Settings.Screen>
            <Settings.Screen name="EditInfo" component={EditInfoScreen}></Settings.Screen>
        </Settings.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Auth.Navigator initialRouteName="Login">
            <Auth.Screen name="Login" component={LoginScreen} options={logoHeaderOptions}></Auth.Screen>
            <Auth.Screen name="Signup" component={SignupScreen}></Auth.Screen>
            <Auth.Screen name="TermsNC" component={TermsNConditionsScreen} options={{ title: "약관동의", ...headerOptions }}></Auth.Screen>
            <Auth.Screen name="CompleteRegister" component={CompleteRegisterScreen}></Auth.Screen>
        </Auth.Navigator>
    );
};

const MainStack = () => {
    return (
        <Main.Navigator initialRouteName="HomeMain">
            <Main.Screen name="HomeMain" component={HomeMainScreen}></Main.Screen>
            <Main.Screen name="Basket" component={BasketScreen}></Main.Screen>
            <Main.Screen name="Order" component={OrderScreen}></Main.Screen>
            <Main.Screen name="RestVideo" component={RestaurantVideoScreen}></Main.Screen>
            <Main.Screen name="FinishOrder" component={FinishOrderScreen} options={{ headerShown: false }}></Main.Screen>
            <Main.Screen name="Settings" component={SettingsStack}></Main.Screen>
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
