import React, { useEffect, useState, useContext } from 'react'
import { ipcRenderer } from 'electron'
import bellIMG from '../../images/bell.png'
import pencilIMG from '../../images/pencil.png'
import './sounds.css'
import GlobalsContext from '../../services/GlobalsContext'
import { testSound } from "../../services/sound"

const sounds = () => {
    const { settings, setSettings } = useContext(GlobalsContext)
    const changeSound = () => {
        ipcRenderer.send('changeSound');
        ipcRenderer.once('updateSoundPath', (event, soundPath) => {
            setSettings({ ...settings, checkoutSound: soundPath })
            // setSoundData({ checkoutSound: soundPath })
        })
    }

    return (
        <div className='sound-card'>
            <h1 className='discordHook-header'>Sounds</h1>
            <p className='cartprod-header'>Successful Checkout</p>
            <p className='cartprod-soundPath'>{String(settings.checkoutSound).length < 39 ? settings.checkoutSound : String(settings.checkoutSound).substring(0, 39) + "...."}</p>
            <img src={pencilIMG} alt="" className='editcart-sound' onClick={changeSound} /><img src={bellIMG} alt="" className='testcart-sound' onClick={() => testSound(settings.checkoutSound)} />




        </div>
    )
}

export default sounds
