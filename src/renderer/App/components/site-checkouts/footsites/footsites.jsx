import React, { useContext } from 'react'
import footsiteLogo from '../../../images/FTL_LOGO.png'
import './footsites.css'
import GlobalsContext from '../../../services/GlobalsContext'

const footsites = () => {

    const { siteCheckouts } = useContext(GlobalsContext)
    return (
        <div className='footsites-card'>
            <img src={footsiteLogo} alt="" />
            <h1 className='totalcheckout-foots-h1'>{siteCheckouts.footsites}</h1>
            <p className='totalcheckout-foots-p'>Footsites Checkouts</p>
        </div>
    )
}

export default footsites
