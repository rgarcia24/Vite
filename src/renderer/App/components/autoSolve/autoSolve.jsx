import React from 'react'
import Notifcation from "../../services/notification"
const Notify = new Notifcation()

import './autoSolve.css'
const autoSolve = () => {

    const saveAutosolve = () => {
        Notify.error("Autosolve Disabled")
    }

    return (
        <div className='autoSolve-card'>
            <h1 className='discordHook-header'>Autosolve</h1>
            <input type="text" id="api-key" name="api-key" placeholder='API Key' spellCheck="false"></input>
            <input type="text" id="api-key" name="api-key" placeholder='Access Token' spellCheck="false"></input>
            <button onClick={saveAutosolve}>Save</button>
        </div>
    )
}

export default autoSolve
