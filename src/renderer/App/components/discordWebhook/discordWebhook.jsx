import { ipcRenderer } from 'electron';
import React from 'react'
import Notification from "../../services/notification"
const Notify = new Notification()
import { toast, Zoom } from 'react-toastify'

import './discordWebhook.css'
const discordWebhook = () => {

    let successWebhook = '';
    let failureWebhook = ''

    const getSuccessWebhook = (event) => {
        successWebhook = event.target.value
    }

    const getFailureWebhook = (event) => {
        failureWebhook = event.target.value
    }

    const saveWebhooks = () => {
        if (successWebhook === "" && failureWebhook === "" || successWebhook === "" || failureWebhook === "") {
            Notify.error("Webhooks are empty!")
            return
        }
        Notify.success('Successfully Saved Webhooks');
        ipcRenderer.send('saveWebhooks', [successWebhook, failureWebhook])
    }
    const testWebhooks = () => {
        ipcRenderer.send('testWebhooks')
    }
    return (
        <div className='discordWebhook-card'>
            <h1 className='discordHook-header'>Discord Notifications</h1>
            <input type="text" id="discord-success" name="discord-success" placeholder='Discord Webhook Success' spellCheck="false" onChange={(e) => getSuccessWebhook(e)}></input>
            <input type="text" id="discord-failure" name="discord-failure" placeholder='Discord Webhook Failure' spellCheck="false" onChange={(e) => getFailureWebhook(e)}></input>
            <button className='save-webhook-btn' onClick={saveWebhooks}>Save</button> <button className='test-webhook-btn' onClick={testWebhooks}>Test</button>
        </div>
    )
}

export default discordWebhook
