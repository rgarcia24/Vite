import React, { useContext } from 'react';
import Carted from './carted/carted'
import Checkouts from './checkouts/checkouts'
import Declines from './declines/declines'
import GlobalsContext from '../../services/GlobalsContext';


import './cards.css'
const cards = () => {
    const { dashAnalytics } = useContext(GlobalsContext)
    return (
        <div className='dashboard-cards'>
            <Checkouts checkouts={dashAnalytics.checkouts}></Checkouts>
            <Carted carted={dashAnalytics.carted}></Carted>
            <Declines declines={dashAnalytics.declines}></Declines>

        </div>
    )
}

export default cards
