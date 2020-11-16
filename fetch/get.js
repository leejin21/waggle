/////////////////////////////////////////////////////////////////////
// * IMPORT SECTION
import ApiUrls from "../constants/ApiUrls";
/////////////////////////////////////////////////////////////////////
// * MAIN SECTION

const objToQueryString = (obj) => {
    // get api에서 params로 들어갈 객체를 url화
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
};

const isEmpty = (obj) => {
    // get api에서 params가 빈 객체({})인 지 확인
    return Object.keys(obj).length === 0;
}

// TODO change function name and divide it to 2 function(totUrl return and header return)
const getApi = async (endpoint, params, userToken=null) => {
    // * get api에 필요한 변수들 return
    console.log("=============================================")
    console.log(endpoint + " GET API");
    // Authorization 관련 코드
    let header  = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    userToken? header.authorization='Bearer '+userToken : null;
    
    // params 인자가 비어있지 않은 경우 totUrl에 params 붙여주기
    let totUrl = ApiUrls.url + endpoint;
    if (!(isEmpty(params))) {
        const queryStr = objToQueryString(params);
        totUrl = ApiUrls.url + endpoint + `?${queryStr}`;
    }
    
    return {totUrl, header};
};
/////////////////////////////////////////////////////////////////////
// * EXPORT SECTION
export default getApi;