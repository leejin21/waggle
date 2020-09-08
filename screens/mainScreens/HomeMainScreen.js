import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeMainScreen = (props) => {
    return (
        <View>
            <Text>This is HomeMainScreen</Text>
            <Button
                title="Go to Settings Stack"
                onPress={() =>
                    props.navigation.navigate("Settings", {
                        name: "MyPage",
                    })
                }
            ></Button>
            <Button title="Go to RestVideo Screen" onPress={() => props.navigation.navigate("RestVideo")}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeMainScreen;
