import React, { useState } from 'react'
import Winbuttons from '../../components/winButtons/winbuttons'
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'
import Keyinfo from '../../components/keyInfo/keyinfo'
import Webhook from '../../components/discordWebhook/discordWebhook'
import Quicktask from '../../components/quickTask/quickTask'
import Autosolve from '../../components/autoSolve/autoSolve'
import Sound from '../../components/Sounds/sounds'
import Update from '../../components/update/update'
import GlobalsContext from '../../services/GlobalsContext'
import { AnimatePresence, motion, useCycle } from 'framer-motion'


import './settings.css'
const settings = () => {
    const [isVisible, onCycle] = useCycle(true, false);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="settings-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>

                        <Keyinfo></Keyinfo>
                        <h1 className='settings-header'>Settings</h1>
                        <Webhook></Webhook>
                        <Quicktask></Quicktask>
                        <Autosolve></Autosolve>
                        <Sound></Sound>
                        <Update></Update>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default settings
