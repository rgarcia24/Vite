import React, { useState } from 'react'

import './taskGroupModal.css'
const taskGroupModal = ({ setOpenModal, createTaskGroup }) => {
    const [taskGroupName, setTaskGroupName] = useState('')
    const getTaskGroupName = (e) => {
        let GroupName = e.target.value
        setTaskGroupName(GroupName)
    }
    return (
        < div className="taskGroupModal" >
            <div className="taskGroupContainer">
                <div className="taskGroup-body">
                    <input type="text" placeholder='Task Group Name' className='proxyName-input' spellCheck='false' onChange={(e) => getTaskGroupName(e)} maxLength="20" />
                </div>
                <div className="taskGroup-footer">


                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="taskGroupClose-btn"
                    >
                        Cancel
                    </button>
                    <button id='taskGroupCreate-Btn' onClick={() => createTaskGroup(taskGroupName)}>Create</button>
                </div>
            </div>
        </div >
    )
}

export default taskGroupModal
