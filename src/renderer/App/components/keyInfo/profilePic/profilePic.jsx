import React from 'react'

import './profilePic.css'
import DefaultAvatar from '../../../images/defaultAvatar.png'
const profilePic = ({ avatarUrl }) => {
    const addDefaultSrc = (e) => {
        e.target.src = DefaultAvatar
    }
    return (
        <div className='img-div'>
            <img src={avatarUrl} onError={(e) => addDefaultSrc(e)} alt="" className='avatar-img' />
        </div>

    )
}

export default profilePic
