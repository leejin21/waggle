import React, { useState, useReducer } from "react";
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

import Colors from "../constants/Colors";
import { headerOptions, logoHeaderOptions } from "../constants/Options";
import AsyncStorage from "@react-native-community/async-storage";

const AuthContext = React.createContext();

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

    // const [isSignedIn, setIsSignedIn] = useState(getIsSignedIn());
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem("userToken");
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                let userToken = "dummy-auth-token";

                try {
                    // const existing = await AsyncStorage.getItem("userToken");
                    // console.log(typeof existing === "string" ? existing : JSON.parse(existing));
                    await AsyncStorage.setItem("userToken", userToken);
                } catch (e) {
                    // Restoring token failed
                    console.log("sign in: failed set user token");
                }

                dispatch({ type: "SIGN_IN", token: userToken });
            },
            signOut: async (data) => {
                let userToken = null;

                try {
                    // const existing = await AsyncStorage.getItem("userToken");
                    // console.log(typeof existing === "string" ? existing : JSON.parse(existing));
                    await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
                } catch (e) {
                    // Restoring token failed
                    console.log("sign out: failed set user token");
                }

                dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>{state.userToken === null ? <AuthStack></AuthStack> : <MainStack></MainStack>}</NavigationContainer>
        </AuthContext.Provider>
    );
};

const styles = StyleSheet.create({});

export default waggleNavigator;
export { AuthContext };
