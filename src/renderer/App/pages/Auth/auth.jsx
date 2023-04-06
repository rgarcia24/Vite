import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import Logo from './logo'
import Keyinput from './keyInput'
import Authbutton from './authButton'
let key = ''

import './auth.css'

const auth = (props) => {
    const [authMsg, setAuthMsg] = useState({ msg: '', error: false, success: false });
    const [key, setKey] = useState('');

    const keyRegex = /^((.{5})\-(.{5})\-(.{5})\-(.{5}))$/;



    const keyChangeHandler = (event) => {
        setKey(event.target.value)
    }
    const checkIsValid = () => {
        if (key === '') return setAuthMsg({ msg: 'Key cannot be empty', error: true, success: true });
        if (keyRegex.test(key)) {
            Authenticate()
        }
        else {
            setAuthMsg({ ...authMsg, msg: "Invalid Key Format", error: true, });
        }
    }
    const Authenticate = () => {


        setAuthMsg({ msg: 'Authenticating...', class: 'authenticating' });
        ipcRenderer.send('checkAuth', key);

        ipcRenderer.once('isAuthReply', (event, result) => {
            if (result.Activate) {
                ipcRenderer.send('saveKey', key)
                setAuthMsg({ msg: "Successfully Authenticated!", success: true, error: false });
            } else {
                setAuthMsg({ msg: result.Msg, error: true, success: false });
            }
        })

    }



    return (
        <>
            <Logo />
            <Keyinput getValue={keyChangeHandler} />
            <p className={authMsg.error ? "auth-msg failed-auth" : authMsg.success ? "auth-msg Success-auth" : "auth-msg authenticating"}>{authMsg.msg}</p>
            <Authbutton msg={checkIsValid} />
        </>
    )
}

export default auth
