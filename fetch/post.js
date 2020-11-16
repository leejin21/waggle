/////////////////////////////////////////////////////////////////////
// * IMPORT SECTION
import reactProductionMin from "react/cjs/react.production.min";
import ApiUrls from "../constants/ApiUrls";

/////////////////////////////////////////////////////////////////////
// * MAIN SECTION
const postApi = async (endpoint, data, accesstoken=null) => {
    // Authorization 관련 코드
    let header  = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    accesstoken? header.accesstoken='Bearer '+accesstoken : null;
    
    try {
        let response = await fetch(ApiUrls.url+endpoint, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });
        const status = await response.status;
        const res = await response.json();
        console.log(res)
        console.log(status)

        if (status!= 400){
            return {res};
        } else {
            return {error: res.error};
        }
    } catch(error) {
        return {error}
    }
};

/////////////////////////////////////////////////////////////////////
// * EXPORT SECTION
export default postApi;