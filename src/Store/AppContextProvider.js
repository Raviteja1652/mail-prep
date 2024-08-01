import React, { useState } from "react";
import AppContext from "./AppContext";

const formatMail = mail => {
    const formatted = mail
    return formatted;
}

const AppContextProvider = props => {
    const userToken = localStorage.getItem('token')
    const [token, setToken] = useState(userToken)
    const [mailId, setMailId] = useState(null)  // changed mail id

    const loginHandler = (token, changedMail) => {
        setToken(token)
        localStorage.setItem('token', token)
        const formatted = formatMail(changedMail)
        setMailId(prev => formatted)

        localStorage.setItem('mailId', changedMail)
    };

    const logoutHandler = () => {}

    const contextValue = {
        token: token,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <div>
            <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
        </div>
    )
};

export default AppContextProvider;