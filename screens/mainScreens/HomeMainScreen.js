// 음식점 리스트에 접근: 하트 쳐둔 것 관련 정보 받기, 하트 쳐둔 것 대로 정렬?
import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import { logoHeaderOptions } from "../../constants/Options";
import ApiUrls from "../../constants/ApiUrls";
import ProfileLogo from "../../components/ProfileLogo";
import ListPhoto from "../../components/ListPhoto";

import CommonStyles from "../../constants/CommonStyles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;

const imageDatas = [
    // * 어쩔 수 없이 uri로 처리하기
    { name: "ABC레스토랑", heart_filled: true, photo: require("../../assets/images/thumbnails/bibimbap.jpg") },
    // 아래가 이미지 전체 공개로 해서 uri로 하게 되는 경우
    // { name: "ABC레스토랑", heart_filled: false, photo: {uri: "https://kr.object.ncloudstorage.com/waggle-thumbnail/bibimbap.jpg"} },
    { name: "가나다식당", heart_filled: false, photo: require("../../assets/images/thumbnails/meat.jpg") },
    { name: "로제찜닭", heart_filled: true, photo: require("../../assets/images/thumbnails/mexican.jpg") },
    { name: "로제떡볶이랄라랄랄랄랄랄", heart_filled: false, photo: require("../../assets/images/thumbnails/earlgreycake.jpg") },
];

// * 서버 부착
const getThumbnails = async () => {
    try {
        let response = await fetch(ApiUrls.url+'/main/thumbnails');
        console.log(await response.json());
    } catch(error) {
        console.log(error);
    }
};

const HomeMainScreen = (props) => {
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerRight: () => <ProfileLogo touchable={true} navigation={props.navigation} style={{ marginRight: pad*1.2 }}></ProfileLogo>,
    });
    // 서버 부착해서 getThumbnails()하나로 이미지 다 다운받고 하기
    return (
        <View style={styles.body}>
            <FlatList
                key={"_"}
                numColumns={2}
                data={imageDatas}
                renderItem={({ item }) => {
                    return <ListPhoto ITEM_WIDTH={windowWidth / 2} item={item.photo} navigation={props.navigation} rest_name={item.name} heart_filled={item.heart_filled} />;
                }}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </View>
    );
};


const styles = StyleSheet.create({
    body: {
        ...CommonStyles.body,
        paddingHorizontal: pad,
        flexDirection: "column",
        alignItems: "center",
    },
});

export default HomeMainScreen;
