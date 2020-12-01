/*
* EXPLANATION
* common data fetch function(GET)
*/
/////////////////////////////////////////////////////////////////////
// * IMPORT SECTION
import {par2url, getHeader} from "./fetchApi";
/////////////////////////////////////////////////////////////////////
// * MAJOR FUNCTIONS
const postData = async (state, end, data) => {
    /*
    * INPUT
    - state: authstate from Navigator's Context
    - end: (ex) /main/thumbnails
    - data: (ex) {}
    * OUTPUT
    - json
    */
    console.log('----------------------------------------');
    console.log('POST '+end);

    const totUrl = par2url(end, {});
    const header = state === null ? getHeader(): getHeader(state.userToken);
    
    try {
        let response = await fetch(totUrl, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data),
        });
        const res = await response.json();
        const status = await response.status;
        console.log('STATUS: ',await response.status);
        console.log(res);
        if (status>=200 && status<300){
            return {res};
        } else {
            return {error: res.error};
        }
    } catch (e) {
        console.error(e);
        return {error: "network error"};
    }
    
}
/////////////////////////////////////////////////////////////////////
// * EXPORT SECTION
export default postData;