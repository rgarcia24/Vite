import React from 'react'

import './taskComp.css'
import startTasksIcon from '../../images/startTasksIcon.png'
import editTasksIcon from '../../images/editTasksIcon.png'
import deleteTaskIcon from '../../images/deleteTaskIcon.png'
const taskComp = ({ taskID, store, profile, sizes, proxy, mode, status, sku, GroupID }) => {

    return (
        <div className='task-Comp'>
            <p className='task-store'>{store}</p>
            <p className='task-product'>{((sku).length > 20) ?
                (((sku).substring(0, 20 - 3)) + '...') :
                sku}</p>
            <p className='task-profile'>{((profile).length > 20) ?
                (((profile).substring(0, 20 - 3)) + '...') :
                profile}</p>
            <p className='task-size'>{((sizes).length > 20) ?
                (((sizes).substring(0, 20 - 3)) + '...') :
                sizes}</p>
            <p className='task-proxy'>{((proxy).length > 20) ?
                (((proxy).substring(0, 20 - 3)) + '...') :
                proxy}</p>
            <p className='task-mode'>{mode}</p>
            <p className='task-status'>{((status).length > 30) ?
                (((status).substring(0, 30 - 3)) + '...') :
                status}</p>
            <div className='actions-icon'>
                <img src={deleteTaskIcon} alt="" />
                <img src={editTasksIcon} alt="" />
                <img src={startTasksIcon} alt="" />
            </div>


        </div>
    )
}

export default taskComp
