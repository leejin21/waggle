/*
* EXPLANATION
* get, post fetch할 때 필요한 인자들(ex: header) return하는 함수들 모음
*/
/////////////////////////////////////////////////////////////////////
// * IMPORT SECTION
import ApiUrls from "../constants/ApiUrls";
/////////////////////////////////////////////////////////////////////
// * SUB FUNCTIONS

const objToQueryString = (obj) => {
    // par2url()에서 params로 들어갈 객체를 url화
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
};

const isEmpty = (obj) => {
    // par2url()에서 params가 빈 객체({})인 지 확인
    return Object.keys(obj).length === 0;
}

/////////////////////////////////////////////////////////////////////
// * MAJOR FUNCTIONS

const par2url = (endpoint, params) => {
    // params 인자가 비어있지 않은 경우 totUrl에 params 붙여주기
    let totUrl = ApiUrls.url + endpoint;
    if (!(isEmpty(params))) {
        const queryStr = objToQueryString(params);
        totUrl = ApiUrls.url + endpoint + `?${queryStr}`;
    }
    return totUrl;
}

const getHeader = (userToken=null) => {
    // Authorization 관련 코드: userToken 붙여주기
    let header  = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    userToken? header.authorization='Bearer '+userToken : null;
    return header;
}

/////////////////////////////////////////////////////////////////////
// * EXPORT SECTION
export {par2url, getHeader};