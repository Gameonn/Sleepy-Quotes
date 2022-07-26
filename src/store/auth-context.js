import React, {useState, useEffect, useCallback} from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    changePassword: (token) => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationTime);
    
    // clear token if remaining time is 1 min - 60000 milliseconds
    if(remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) initialToken = tokenData.token;

    const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if(logoutTimer) clearTimeout(logoutTimer);
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);

    }

    const changePasswordHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    useEffect(() => {
        if(tokenData) {
            console.log(tokenData);
            
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }

    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        changePassword: changePasswordHandler
    };

    return <AuthContext.Provider value={contextValue}> {props.children} </AuthContext.Provider>;
}

export default AuthContext;