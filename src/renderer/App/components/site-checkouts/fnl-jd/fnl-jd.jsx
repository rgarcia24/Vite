import React, { useContext } from 'react'
import JDLOGO from '../../../images/JD_logo.png'
import GlobalsContext from '../../../services/GlobalsContext'


import './fnl-jd.css'
const fnl = () => {
    const { siteCheckouts } = useContext(GlobalsContext)

    return (
        <div className='fnl-jd-card'>
            <img src={JDLOGO} alt="" />
            <h1 className='totalcheckout-foots-h1'>{siteCheckouts.JDFNL}</h1>
            <p className='totalcheckout-foots-p'>JD/FNL Checkouts</p>
        </div>
    )
}

export default fnl
