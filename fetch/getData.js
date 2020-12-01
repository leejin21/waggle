/*
* EXPLANATION
* common data fetch function(GET)
*/
/////////////////////////////////////////////////////////////////////
// * IMPORT SECTION
import {par2url, getHeader} from "./fetchApi";
/////////////////////////////////////////////////////////////////////
// * MAJOR FUNCTIONS
const getData = async (state, end, params) => {
    /*
    * INPUT
    - state: authstate from Navigator's Context
    - end: (ex) /main/thumbnails
    - params: (ex) {}
    * OUTPUT
    - json
    */
    console.log('----------------------------------------');
    console.log('GET '+end);

    const totUrl = par2url(end, params);
    const header = getHeader(state.userToken);

    try {
        let response = await fetch(totUrl, {
            method: 'GET',
            headers: header,
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
};
/////////////////////////////////////////////////////////////////////
// * EXPORT SECTION
export default getData;