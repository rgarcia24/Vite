import React, { useState } from 'react'
import Winbuttons from '../../components/winButtons/winbuttons'
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'
import { AnimatePresence, motion, useCycle } from 'framer-motion'


const captcha = () => {
    const [isVisible, onCycle] = useCycle(true, false);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="captcha-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}>
                        <p className='test'>Captcha Page</p>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence>
    )
}

export default captcha
