import React, { useContext } from 'react'
import Navbar from '../../components/navbar/nav'
import Winbuttons from '../../components/winButtons/winbuttons'
import Clock from '../../components/clock/clock'
import Cards from '../../components/dash-cards/cards'
import Recentcheckouts from '../../components/recent-checkouts/recentCheckouts'
import Footsitescard from '../../components/site-checkouts/footsites/footsites'
import FnlJDcard from '../../components/site-checkouts/fnl-jd/fnl-jd'
import Shopifycard from '../../components/site-checkouts/shopify/shopify'
import Yscard from '../../components/site-checkouts/yeezysupply/ys'
import Chart from '../../components/chart/chart'
import GlobalsContext from '../../services/GlobalsContext'
import { motion, AnimatePresence, useCycle } from "framer-motion"

import './dashboard.css'

const dashboard = () => {
    const [isVisible, onCycle] = useCycle(true, false);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="dash-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Cards ></Cards>
                        <h1 className='test'>Analytics</h1>
                        <Recentcheckouts ></Recentcheckouts>
                        <Chart></Chart>
                    </motion.div>
                </>


            )}
        </AnimatePresence>
    )
}

export default dashboard
