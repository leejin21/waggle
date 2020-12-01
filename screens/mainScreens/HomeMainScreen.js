// 음식점 리스트에 접근: 하트 쳐둔 것 관련 정보 받기, 하트 쳐둔 것 대로 정렬?

/////////////////////////////////////////////////////////////////////////////////
//* IMPORT SECTION

// import made modules
import React, { useContext, useState , useEffect} from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

// import custom modules
import { logoHeaderOptions } from "../../constants/Options";
import ApiUrls from "../../constants/ApiUrls";
import ProfileLogo from "../../components/ProfileLogo";
import ListPhoto from "../../components/ListPhoto";
import CommonStyles from "../../constants/CommonStyles";

// import custom fetch modules
import getData from "../../fetch/getData";
import { Context } from "../../navigation/Store";

/////////////////////////////////////////////////////////////////////////////////
// * INITIALIZE: COMPONENT SIZE
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const pad = windowHeight / 80;

/////////////////////////////////////////////////////////////////////////////////
// * SCREEN SECTION
const HomeMainScreen = (props) => {
    /////////////////////////////////////////////////////////////////////////////////
    // INITIALIZATION AND STATES SECTION
    const [imageDatas, setImageDatas] = useState()
    const [state, dispatch] = useContext(Context);
    props.navigation.setOptions({
        ...logoHeaderOptions,
        headerRight: () => <ProfileLogo touchable={true} navigation={props.navigation} style={{ marginRight: pad*1.2 }}></ProfileLogo>,
    });

    /////////////////////////////////////////////////////////////////////////////////
    // USE EFFECT SECTION: AFTER DID MOUNT, BEFORE RENDER
    useEffect(()=> {
        const fetchImages = async () =>  {
            /*
            TODO photo 없애고 rest_id로 대신하기(like video url)
            * GET /main/thumbnails 
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
            const {res, error} = await getData(state, '/main/thumbnails', {});
            if (error) {
                Alert.alert('네트워크 에러', '네트워크가 불안정합니다.');
            } else {
                setImageDatas(imageDatas => res);
            }
        };
        fetchImages();
    }, []);
    /////////////////////////////////////////////////////////////////////////////////
    // RENDERING SECTION
    return (
        <View style={styles.body}>
            <FlatList
                // TODO step 2: 위로 roll하면 thumbnail 다시 get하도록 하기
                key={"_"}
                numColumns={2}
                data={imageDatas}
                renderItem={({ item }) => {
                    return <ListPhoto 
                        ITEM_WIDTH={windowWidth / 2}
                        photo={{uri: ApiUrls.FETCH_THUMBNAIL+item.photo}}
                        rest_id = {item.rest_id}
                        navigation={props.navigation} 
                        rest_name={item.name}  
                        heart_filled = {item.heart_filled}
                    />;
                }}
                extraData={imageDatas}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
        </View>
    );
};

/////////////////////////////////////////////////////////////////////////////////
//* STYLES SECTION
const styles = StyleSheet.create({
    body: {
        ...CommonStyles.body,
        paddingHorizontal: pad,
        flexDirection: "column",
        alignItems: "center",
    },
});

/////////////////////////////////////////////////////////////////////////////////
//* EXPORT SECTION
export default HomeMainScreen;