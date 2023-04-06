import React from 'react'
import { ipcRenderer } from 'electron'

import './update.css'
const update = () => {

    const getUpdate = async () => {
        console.log('getting update')
        ipcRenderer.send('getUpdate');
    }
    return (
        <div className='update-card'>
            <h1 className='discordHook-header'>Change Log</h1>
            <p className='update-version'>Update: <span>v1.0.0</span></p>
            <ul>
                <li className='changelog-details'>Beta Released</li>
                <li className='changelog-details'>Added Footsites</li>
            </ul>
            {/* <p className='changelog-details'>Beta Released</p>
            <p className='changelog-details'>Added Footsites</p> */}
            <button className='update-btn' onClick={getUpdate}>Update</button>
        </div>
    )
}

export default update
