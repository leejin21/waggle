import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

const setIsSignedIn = async (value) => {
    try {
        await AsyncStorage.setItem("isSignedIn", value);
    } catch (e) {
        console.log("error: setIsSignedIn", e);
    }
};

const getIsSignedIn = async () => {
    try {
        return await AsyncStorage.getItem("@isSignedIn");
    } catch (e) {
        console.log("error: getIsSignedIn", e);
    }

    console.log("Done.");
};
