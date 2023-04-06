import React from 'react'


import './profileGroup.css'
import duplicateIcon from '../../images/duplicateIcon.png'
import editIcon from '../../images/edit-icon.png'
import trashIcon from '../../images/trash-icon.png'
import toggleIcon from '../../images/toggleIcon.png'


const profileGroup = ({ name, amount, index, deleteGroup, duplicateGroup, setProfileGroupIndex, showProfiles, selectGroup, id, selectedGroups, editProfileGroupHandler }) => {
    return (
        <div className={selectedGroups.find(group => group.id === id) ? "profileGroup-div-selected " : 'profileGroup-div'} onClick={() => selectGroup(index)}>
            <p className='ProfileGroup-name'>{name}</p>
            <p className='profilesAmount'> {amount} Profiles</p>
            <div className='fourCard-info'>
            </div>
            <div className='profileGroup-actions'>
                <img src={toggleIcon} alt="" onClick={() => showProfiles(index)} /> <img src={trashIcon} alt="" onClick={() => deleteGroup(index)} /> <img src={editIcon} alt="" onClick={() => { editProfileGroupHandler(index) }} /> <img src={duplicateIcon} alt="" onClick={() => duplicateGroup(index)} />
            </div>

        </div>
    )
}

export default profileGroup
