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
import post from "../fetch/post";

/////////////////////////////////////////////////////////////////////////////////
// * MAIN CODE SECTION

// - INITIALIZE 
const AuthContext = React.createContext();

// - SMALL FUNCTION 
const alert = (title, message) => {
    Alert.alert(title, message);
}

// - MAIN FUNCTION
const BigNavigator = (props) => {
    // Main or Auth
    // |_ Settings
    // 참고: https://medium.com/@martin.crabtree/react-creating-a-redux-like-global-state-with-the-usecontext-and-usereducer-hooks-89aa2b27dbc5
    
    const [state, dispatch] = React.useContext(Context);

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem("userToken");
            } catch (e) {
                // Restoring token failed
                console.log("Restoring token failed")
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
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
                    // We will also need to handle errors if sign in failed
                    alert("LOGIN FAIL", error)
                } else {
                    // After getting token, we need to persist the token using `AsyncStorage`
                    let userToken = res.accessToken;

                    try {
                        await AsyncStorage.setItem("userToken", userToken);
                    } catch (e) {
                        // Restoring token failed
                        console.log("sign in: failed set user token");
                    }

                    dispatch({ type: "SIGN_IN", token: userToken });
                }
                
            },
            signOut: async (data) => {
                let userToken = null;

                try {
                    // const existing = await AsyncStorage.getItem("userToken");
                    // console.log(typeof existing === "string" ? existing : JSON.parse(existing));
                    await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
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