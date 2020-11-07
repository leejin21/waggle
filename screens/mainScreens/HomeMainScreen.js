// 음식점 리스트에 접근: 하트 쳐둔 것 관련 정보 받기, 하트 쳐둔 것 대로 정렬?
import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import { logoHeaderOptions } from "../../constants/Options";
import ProfileLogo from "../../components/ProfileLogo";
import ListPhoto from "../../components/ListPhoto";

import CommonStyles from "../../constants/CommonStyles";

const SCREEN_WIDTH = Dimensions.get("window").width;

const imageDatas = [
    { name: "ABC레스토랑", heart_filled: true, photo: require("../../assets/images/thumbnails/bibimbap.jpg") },
    { name: "가나다식당", heart_filled: false, photo: require("../../assets/images/thumbnails/meat.jpg") },
    { name: "로제찜닭", heart_filled: false, photo: require("../../assets/images/thumbnails/mexican.jpg") },
    { name: "로제떡볶이랄라랄랄랄랄랄", heart_filled: false, photo: require("../../assets/images/thumbnails/earlgreycake.jpg") },
];

const HomeMainScreen = (props) => {
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerRight: () => <ProfileLogo touchable={true} navigation={props.navigation} style={{ marginRight: 12 }}></ProfileLogo>,
    });

    return (
        <View style={styles.body}>
            <FlatList
                key={"_"}
                numColumns={2}
                data={imageDatas}
                renderItem={({ item }) => {
                    return <ListPhoto ITEM_WIDTH={SCREEN_WIDTH / 2} item={item.photo} navigation={props.navigation} rest_name={item.name} heart_filled={item.heart_filled} />;
                }}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        ...CommonStyles.body,
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "center",
    },
});

export default HomeMainScreen;
