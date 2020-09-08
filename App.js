import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import WaggleNavigator from "./navigation/WaggleNavigator";

export default function App() {
    return <WaggleNavigator></WaggleNavigator>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
