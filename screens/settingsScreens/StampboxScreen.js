import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/Colors";
import CommonStyles from "../../constants/CommonStyles";
import { headerOptions } from "../../constants/Options";

import NoCardTemplate from "../../templates/NoCardTemplate";
import CardButton from "../../components/CardButton"; 

// custom modules for fetch
import { par2url, getHeader } from "../../fetch/fetchApi";
import { Context } from "../../navigation/Store";

const stampDatas = [
    // { name: 'ABC레스토랑', collected: '2', all: '10'},
    { name: '풀사이드', collected: '10', all: '10'},
    { name: 'ABC', collected: '13', all: '10'}
]

const getStampBox = async (state) => {
    const totUrl = par2url('/stamp/box', {});
    const header = getHeader(state.userToken);
    console.log("stamp/box GET");
    try {
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
        });
        let json = await response.json();
        console.log('GET /STAMP/BOX');
        console.log(json);
        return json;
    } catch (e) {
        console.error(e);
    }
    
};

const StampboxView = (props) => {
    // props: stampBox
    const navi = props.navigation;
    

    const renderItem = ({item}) => {
        // stampbox의 collected가 10을 초과할 경우 10개로 넘겨주기.
        const laststampNum = (item.collected >= 10) ? 10: item.collected;
        return (<CardButton name={item.name} fullstampNum={item.all} laststampNum={laststampNum} collected={item.collected} all={item.all} navigation={navi}/>);
    }

    return(
        <View style={{ width: "100%" }}>
            {props.stampBox.length === 0
                ?
                <Text style={{...CommonStyles.small_text, paddingVertical: 20}}>쿠폰함에서 리뷰를 남기고 스탬프를 모아 주세요.</Text>
                :
                <View>
                    <Text style={{...CommonStyles.small_text, paddingVertical: 20}}>클릭시 상세 정보를 알 수 있어요.</Text>
                    <FlatList
                        key="_"
                        data={props.stampBox}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ width: "100%" }}
                    ></FlatList>
                </View>
            }
        </View>
    );
}

const StampboxScreen = (props) => {
    props.navigation.setOptions({
        ...headerOptions,
        headerTintColor: Colors.text_grey,
        headerStyle: {
            ...headerOptions.headerStyle,
            backgroundColor: Colors.mid_grey,
        },
        headerTitleStyle: {
            ...headerOptions.headerTitleStyle,
            color: "white",
        },
    });
    // const [stampBox, setStampBox] = React.useState([]);
    const [AuthState, authDispatch] = React.useContext(Context);
    const navi = props.navigation; //?
    
    const stampBox = stampDatas;
    // useEffect(()=> {
    //     const fetchStampBox = async () => {
    //         const json = await getStampBox(AuthState);
    //         // await getStampBox(AuthState);
    //         await setStampBox(json);
    //     };
    //     fetchStampBox();
    // }, []);
    
    return (
        <NoCardTemplate
        bodyview={<StampboxView navigation={navi} stampBox={stampBox}/>}
        needButton={false}
        isHeaderBlack={false}
        />
    );
}

export default StampboxScreen;