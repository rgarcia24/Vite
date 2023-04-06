import React, { useContext } from 'react'
import YSLOGO from '../../../images/yzy_logo.png'
import GlobalsContext from '../../../services/GlobalsContext'

import './ys.css'
const ys = () => {
    const { siteCheckouts } = useContext(GlobalsContext)
    return (
        <div className='ys-card'>
            <img src={YSLOGO} alt="" />
            <h1 className='totalcheckout-foots-h1'>{siteCheckouts.YS}</h1>
            <p className='totalcheckout-ys-p'>YeezySupply Checkouts</p>
        </div>
    )
}

export default ys
