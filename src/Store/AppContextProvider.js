import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const formatMail = mail => {
    const formatted = mail
    return formatted;
};
const cleanMail = mail => {
    const cleaned = mail.replace('@', '').replace('.', '').replace('.', '')
    return cleaned
}

const AppContextProvider = props => {
    const [token, setToken] = useState('')
    const [mailId, setMailId] = useState(null)  // changed mail id
    const [userMail, setUserMail] = useState('')  // logged in mail
    const [inboxMails, setInboxMails] = useState([])
    const [sentMails, setSentMails] = useState([])
    const [notification, setNotification] = useState(null)
    const isLoggedIn = !!token;

    const showNotification = (status, title, message) => {
        setNotification({status, title, message})

        setTimeout(() => {
            setNotification(null)
        }, 3000)
    };

    const loginHandler = (token, changedMail, enteredEmail) => {
        setToken(token)
        localStorage.setItem('token', token)
        setUserMail(enteredEmail)
        localStorage.setItem('userMail', enteredEmail)

        const formatted = formatMail(changedMail)
        setMailId(prev => formatted)

        localStorage.setItem('mailId', changedMail)

        // inboxClickHandler()     // these 2 funcs are executing on login but since mailId state doesn't update by the time, these
        // sentClickHandler()      // returns null, ntwk call is going to _null_mails. so until we click inbox or send we wont get the mails.
    };

    const logoutHandler = () => {
        setToken(null)
        setMailId(null)
        setUserMail('')
        localStorage.removeItem('token')
        localStorage.removeItem('mailId')
        localStorage.removeItem('userMail')
    };

    const onPageLoad = async () => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)

        const storedMail = localStorage.getItem('userMail')
        const loggedInMail = formatMail(storedMail)
        setUserMail(prev => {return loggedInMail})

        const storedCleanedMail = localStorage.getItem('mailId')
        const formatted = formatMail(storedCleanedMail)
        setMailId(prev => formatted)

        try {
            const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${formatted}_mails.json`)
            const data = await res.data
            let filteredData = []
            for (let key in data) {
                filteredData.unshift({...data[key], id: key})
            }
            setSentMails(filteredData)
            console.log(filteredData)
        } catch (error) { console.log(error) }

        try {
            const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${formatted}_inboxMails.json`)
            const data = await res.data
            let filteredData = []
            for (let key in data) {
                filteredData.unshift({...data[key], id: key})
            }
            setInboxMails(filteredData)
            console.log(data)
        } catch (err) { console.log(err) }
    };

    const sendMailHandler = async (mail) => {
        showNotification('pending', 'Sending...', 'Your mail is being sent')
        try {
            const postRes = await axios.post(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_mails.json`, mail)
            const data = await postRes.data
            showNotification('success', 'Mail Sent', 'Your mail was sent successfully')
            console.log(data)
        } catch (error) {
            showNotification('error', 'Error', 'There was an error sending your mail')
            console.log(error)
        };
        
        const recepMail = mail.recipientMail
        const cleanedRecepMail = cleanMail(recepMail)

        try {
            const res = await axios.post(`https://api-calls-prep-default-rtdb.firebaseio.com/_${cleanedRecepMail}_inboxMails.json`, mail)
            const data = await res.data
            console.log(data)
        } catch (error) { console.log(error) }
    };

    const inboxClickHandler = async () => {
        try {
            const getRes = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_inboxMails.json`)
            const data = await getRes.data
            let filteredData = [];
            for (let key in data) {
                filteredData.unshift({...data[key], id: key})
            };
            setInboxMails(filteredData)
            console.log(data)
        } catch (error) { console.log(error) }
    };

    const sentClickHandler = async () => {
        try {
            const getRes = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_mails.json`)
            const data = await getRes.data
            let filteredData = []
            for (let key in data) {
                filteredData.unshift({...data[key], id: key})
            }
            setSentMails(filteredData)
            console.log(data)
        } catch (error) { console.log(error) }
    };
    const changeInboxMailHandler = async (selected) => {
        try {
            const res = await axios.get(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_inboxMails.json`)
            const data = await res.data

            let filteredData = []
            for (let key in data) {
                if (selected === 'all') {
                    filteredData.unshift({...data[key], id: key})
                } else if (selected === 'read' && data[key].isRead) {
                    filteredData.unshift({...data[key], id: key})
                } else if (selected === 'unread' && !data[key].isRead) {
                    filteredData.unshift({...data[key], id: key})
                }
            }
            
            setInboxMails(filteredData)
        } catch (error) { console.log(error) }
        
    };
    const readMailHandler = async (id) => {
        setInboxMails(prev => {
            return prev.map(mail => mail.id === id ? {...mail, isRead: true} : mail)
        });
        try {
            const url = `https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_inboxMails/${id}.json`
            const res = await axios.get(url)
            const mailData = await res.data
            mailData.isRead = true
            const putReq = await axios.put(url, mailData)
        } catch (error) { console.log(error) }
    };
    const deleteMailHandler = async (id) => {
        try {
            const res = await axios.delete(`https://api-calls-prep-default-rtdb.firebaseio.com/_${mailId}_inboxMails/${id}.json`)
            const data = await res.data
            console.log(data)
            alert('Mail successfully deleted')
        } catch (error) { console.log(error) }
        setInboxMails(prev => {
            const updated = prev.filter(mail => mail.id !== id)
            return updated;
        })
        
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        userMail: userMail,
        inboxMails: inboxMails,
        sentMails: sentMails,
        login: loginHandler,
        logout: logoutHandler,
        sendMail: sendMailHandler,
        inboxClick: inboxClickHandler,
        sentClick: sentClickHandler,
        changeInboxMails: changeInboxMailHandler,
        readMail: readMailHandler,
        deleteMail: deleteMailHandler,
        onLoad: onPageLoad,
        notification: notification
    }

    return (
        <div>
            <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
        </div>
    )
};

export default AppContextProvider;