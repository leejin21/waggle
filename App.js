import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import WaggleNavigator from "./navigation/WaggleNavigator";
import Store from "./navigation/Store";

export default function App() {
    const [loaded] = useFonts({
        noto_bold: require("./assets/fonts/NotoSansKR-Bold.ttf"),
        noto_regular: require("./assets/fonts/NotoSansKR-Regular.ttf"),
    });
    if (!loaded) {
        return <AppLoading></AppLoading>;
    }
    return (
        <Store>
            <WaggleNavigator></WaggleNavigator>
        </Store>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
