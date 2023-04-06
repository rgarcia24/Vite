import React from 'react'

import './profileRowComp.css'
import editIcon from '../../images/edit-icon.png'
import trashIcon from '../../images/trash-icon.png'
const profileRowComp = ({ profile, index, deleteProfiles, editProfile }) => {

    const { name, shippingAddress, paymentDetails } = profile
    const fullname = shippingAddress.name
    const email = shippingAddress.email
    const phone = shippingAddress.phone
    const address = shippingAddress.line1
    const cardNum = paymentDetails.cardNumber
    const type = paymentDetails.cardType
    const expiry = `${paymentDetails.cardExpMonth}/${paymentDetails.cardExpYear}`

    return (
        <div className='profile-comp'>
            <p className='profileComp-Name'>{((name).length > 15) ?
                (((name).substring(0, 15 - 3)) + '...') :
                name}</p>
            <p className='profileComp-CardHolder'>{fullname}</p>
            <p className='profileComp-Email'>{((email).length > 17) ?
                (((email).substring(0, 17 - 3)) + '...') :
                email}</p>
            <p className='profileComp-PhoneNumber'>{phone}</p>
            <p className='profileComp-Address'>{((address).length > 25) ?
                (((address).substring(0, 25 - 3)) + '...') :
                address}</p>
            <p className='profileComp-type'>{((type).length > 20) ?
                (((type).substring(0, 20 - 3)) + '...') :
                type}</p>
            <p className='profileComp-expiry'>{expiry}</p>
            <p className='profileComp-Card'>{cardNum.substring(cardNum.length - 4)}</p>
            <img src={trashIcon} alt="" className='deleteProfile-icon' onClick={() => deleteProfiles(index)} />
            <img src={editIcon} alt="" className='editProfile-Icon ' onClick={() => editProfile(index)} />
        </div>
    )
}

export default profileRowComp
