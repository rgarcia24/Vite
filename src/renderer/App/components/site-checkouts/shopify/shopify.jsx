import React, { useContext } from 'react'
import ShopifyLOGO from '../../../images/Shopify_logo.png'
import GlobalsContext from '../../../services/GlobalsContext'


import './shopify.css'
const shopify = () => {
    const { siteCheckouts } = useContext(GlobalsContext)
    return (
        <div className='shopify-card'>
            <img src={ShopifyLOGO} alt="" />
            <h1 className='totalcheckout-foots-h1'>{siteCheckouts.shopify}</h1>
            <p className='totalcheckout-foots-p'>Shopify Checkouts</p>
        </div>
    )
}

export default shopify
