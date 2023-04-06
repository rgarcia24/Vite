import React, { useState, useContext } from 'react';
import { ipcRenderer } from 'electron'
import regeneratorRuntime from "regenerator-runtime";
import ProfilePic from './profilePic/profilePic'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Notifcation from "../../services/notification"
import GlobalsContext from '../../services/GlobalsContext';
const Notify = new Notifcation()

import 'react-toastify/dist/ReactToastify.css';
import './keyinfo.css'
const keyinfo = () => {


    const { keyInfo } = useContext(GlobalsContext)

    const toggleKey = () => {
        setShowKey({ show: !showKey.show })
    }
    const [showKey, setShowKey] = useState({ show: false })
    const copyKey = () => {
        navigator.clipboard.writeText(keyInfo.licenseKey)
        Notify.success('Copied License key');
    }

    const goToDashboard = () => {

        ipcRenderer.send('goToDashboard')
    }
    return (
        <div className='keyinfo-card'>
            <ProfilePic avatarUrl={keyInfo.avatar}></ProfilePic>
            <h1 className='welcome-headers'>Welcome Back, <br /><span className='user-span'>{keyInfo.username}</span></h1>
            <div className='keyinfo'>
                <p>Key Type: <span>{keyInfo.keyType}</span></p>
                <p>Expires: <span>{keyInfo.expiry ? keyInfo.expiry : "Lifetime"}</span></p>
                <p>License Key: </p>
                {showKey.show
                    ? <p className='licensekey-p' onClick={() => copyKey()} > {keyInfo.licenseKey}   <VisibilityIcon className='showkey-btn' onClick={toggleKey}></VisibilityIcon></p>
                    : <p className='licensekey-p'>&#9679;&#9679;&#9679;&#9679;&#9679;  &#9679;&#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;&#9679; &#9679;&#9679;&#9679;&#9679;&#9679;  <VisibilityIcon className='showkey-btn' onClick={toggleKey}></VisibilityIcon></p>}
                <button className='deactivate-btn'>Deactivate</button> <button className='dashboard-btn' onClick={goToDashboard}>Dashboard</button>
                {/* <Button className={deactivateClasses.root} variant="contained" disableRipple={false}>Deactivate</Button>
                <Button className={dashboardClasses.root} variant="contained" disableRipple={false}>Dashboard</Button> */}


            </div>


        </div>
    )
}

export default keyinfo
