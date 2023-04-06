import React from 'react'
import Notification from '../../services/notification';
const Notify = new Notification()

import './quickTask.css'
const autoSolve = () => {

    const saveQT = () => {
        Notify.error('QT Disabled');
    }

    return (
        <div className='quickTask-card'>
            <h1 className='discordHook-header'>Quick Task</h1>
            <select name="Profile" id="Profile" defaultValue='Profile'>
                <option value="Profile" disabled="disabled" hidden={true}>Profile</option>
                <option value="">Disabled</option>
            </select>
            <select name="Proxy" id="Proxy" defaultValue='Proxy'>
                <option value="Proxy" disabled="disabled" hidden={true}>Proxy</option>
                <option value="">Disabled</option>
            </select>
            <select name="Size" id="Size" defaultValue='Size'>
                <option value="Size" disabled=" disabled" hidden={true}>Size</option>
                <option value="">Disabled</option>
            </select>
            <select name="Mode" id="Mode" defaultValue='Mode' >
                <option value="Mode" disabled="disabled" hidden={true}>Mode</option>
                <option value="">Disabled</option>
            </select>
            <button className='save-qt' onClick={saveQT}>Save</button>
        </div>
    )
}

export default autoSolve
