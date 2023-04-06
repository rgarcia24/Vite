import React from 'react'

import './proxyComp.css'
import editIcon from '../../images/edit-icon.png'
import trashIcon from '../../images/trash-icon.png'
const proxyComp = ({ name, ammount, deleteProxy, editProxy, id }) => {

    return (
        <div className='proxy-Comp'>
            <p className='proxyName'>{name}</p>
            <p className='proxyAmount'>{ammount}</p>
            <img src={trashIcon} alt="" className='trashIcon' onClick={() => deleteProxy(id)} />
            <img src={editIcon} alt="" className='editIcon' onClick={() => editProxy(id)} />
        </div>
    )
}

export default proxyComp
