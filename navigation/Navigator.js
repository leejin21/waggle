/////////////////////////////////////////////////////////////////////////////////
// * Use: WaggleNavigator
// * FOR FIXING THE ISSUE OF REQUIRE CYCLE

// ! FIXME Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,
/////////////////////////////////////////////////////////////////////////////////
// * IMPORT SECTION 

// - MODULES
import React from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

// - LOCAL MODULES
import {Context} from "./Store";
import {getHeader, par2url} from "../fetch/fetchApi";

/////////////////////////////////////////////////////////////////////////////////
// * MAIN CODE SECTION

// - INITIALIZE 
const AuthContext = React.createContext();

// - SMALL FUNCTION 
const alert = (title, message) => {
    Alert.alert(title, message);
}

const post = async (endpoint, data) => {
    // Authorization 관련 코드
    let header = getHeader();
    let url = par2url(endpoint, {});
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        });
        const status = await response.status;
        const res = await response.json();
        console.log(res, status)

        if (status!= 400){
            return {res};
        } else {
            return {error: res.error};
        }
    } catch(error) {
        return {error}
    }
};

// - MAIN FUNCTION
const BigNavigator = (props) => {
    // Main or Auth
    // |_ Settings
    // 참고: https://medium.com/@martin.crabtree/react-creating-a-redux-like-global-state-with-the-usecontext-and-usereducer-hooks-89aa2b27dbc5
    
    const [state, dispatch] = React.useContext(Context);

    React.useEffect(() => {
        /* 
            * Explanation
            Fetch the token from storage then navigate to our appropriate place
            This will switch to the App screen or Auth screen and this loading
            screen will be unmounted and thrown away.
        */
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem("userToken");
                userToken = JSON.parse(userToken);
            } catch (e) {
                // Restoring token failed
                console.log("Restoring token failed")
            }
            // TODO need to validate token: if expired
            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // Send data (email, pw) to server and get a token
                const {res, error} = await post("/user/login", data);
            
                if (error) {
                    // handle errors if sign in failed
                    alert("LOGIN FAIL", "로그인이 실패하였습니다.")
                } else {
                    // After getting token, we need to persist the token using `AsyncStorage`
                    let userToken = res.accessToken;

                    try {
                        // TODO token json 형식으로 저장해야 하는 지 찾아보기
                        await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
                    } catch (e) {
                        // Restoring token failed
                        console.log("sign in: failed set user token");
                    }
                    console.log("로그인");
                    dispatch({ type: "SIGN_IN", token: userToken });
                }
                
            },
            signOut: async (data) => {
                let userToken = null;

                try {
                    await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
                    console.log("로그아웃");
                } catch (e) {
                    // Restoring token failed
                    console.log("sign out: failed set user token");
                }

                dispatch({ type: "SIGN_OUT" });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};


/////////////////////////////////////////////////////////////////////////////////
// * EXPORT SECTION

export {AuthContext};
export default BigNavigator;