import React, { useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const formatMail = mail => {
    const formatted = mail
    return formatted;
}

const AppContextProvider = props => {
    const userToken = localStorage.getItem('token')
    const [token, setToken] = useState(userToken)
    const [mailId, setMailId] = useState(null)  // changed mail id
    const [userMail, setUserMail] = useState('')  // logged in mail
    const isLoggedIn = !!token

    const loginHandler = (token, changedMail, enteredEmail) => {
        setToken(token)
        localStorage.setItem('token', token)
        setUserMail(enteredEmail)
        localStorage.setItem('userMail', enteredEmail)

        const formatted = formatMail(changedMail)
        setMailId(prev => formatted)

        localStorage.setItem('mailId', changedMail)
    };

    const logoutHandler = () => {
        setToken(null)
        setMailId(null)
        setUserMail('')
        localStorage.removeItem('token')
        localStorage.removeItem('mailId')
        localStorage.removeItem('userMail')
    };

    const sendMailHandler = async (mail) => {
        try {
            const postRes = await axios.post (`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_mails.json`, mail)
            const data = await postRes.data
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        userMail: userMail,
        login: loginHandler,
        logout: logoutHandler,
        sendMail: sendMailHandler
    }

    return (
        <div>
            <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
        </div>
    )
};

export default AppContextProvider;