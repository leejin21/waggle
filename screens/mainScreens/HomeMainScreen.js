// 음식점 리스트에 접근: 하트 쳐둔 것 관련 정보 받기, 하트 쳐둔 것 대로 정렬?
import React, { useContext, useState , useEffect} from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import { logoHeaderOptions } from "../../constants/Options";
import ApiUrls from "../../constants/ApiUrls";
import ProfileLogo from "../../components/ProfileLogo";
import ListPhoto from "../../components/ListPhoto";
import {par2url, getHeader} from "../../fetch/fetchApi";

import CommonStyles from "../../constants/CommonStyles";
import { Context } from "../../navigation/Store";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;

// * 서버 부착
const getThumbnails = async (state, data) => {
    // TODO photo 없애고 rest_id로 대신하기(like video url)
    /*
        * JSON FORM
        Array [
            Object {
                "heart_filled": true,
                "name": "포이푸",
                "photo": "1.png",
                "rest_id": 1,
            },
        ...
        ]
    */
    // * GET main/thumbnails
    const totUrl = par2url('/main/thumbnails', {});
    const header = getHeader(state.userToken)
    try {    
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
            body: JSON.stringify(data),
        });
        let json = await response.json();
        
        console.log(json);
        return json;
    } catch(error) {
        // error의 경우 뭘 return해 줄 지 고민
        console.log(error);
    }
};

const HomeMainScreen = (props) => {
    const [imageDatas, setImageDatas] = useState()
    const [state, dispatch] = useContext(Context);
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerRight: () => <ProfileLogo touchable={true} navigation={props.navigation} style={{ marginRight: pad*1.2 }}></ProfileLogo>,
    });

    // 예시 찾아보기: flatlist, fetch
    useEffect(()=> {
        const fetchImages = async () =>  {
            try {
                const json = await getThumbnails(state);
                setImageDatas(imageDatas => json);
            } catch (e) {
                console.log(e);
            }
        };
        fetchImages();
    }, []);

    // 서버 부착해서 getThumbnails()하나로 이미지 다 다운받고 하기
    return (
        <View style={styles.body}>
            <FlatList
                key={"_"}
                numColumns={2}
                data={imageDatas}
                renderItem={({ item }) => {
                    return <ListPhoto 
                        ITEM_WIDTH={windowWidth / 2}
                        item={{uri: ApiUrls.FETCH_THUMBNAIL+item.photo}}
                        rest_id = {item.rest_id}
                        navigation={props.navigation} 
                        rest_name={item.name} 
                        heart_filled={item.heart_filled} 
                    />;
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
