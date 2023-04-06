import React, { useState, useEffect, useContext, useCallback } from 'react'
import Winbuttons from '../../components/winButtons/winbuttons'
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'
import ProfileGroup from '../../components/profileGroup/profileGroup'
import { ipcRenderer } from 'electron'
import { v4 as uuidv4 } from 'uuid';
import ProfilesComp from './profilesComp'
import GlobalsContext from '../../services/GlobalsContext'
import TrashIcon from '../../images/deleteTaskIcon.png'
import ProfileGroupModal from '../../components/ProfileGroupModal'
import { motion, AnimatePresence, useCycle } from "framer-motion"


import './profile.css'
import addTaskGroupIcon from '../../images/addTaskGroup.png'
const profiles = () => {

    const [isVisible, onCycle] = useCycle(true, false);
    const { profileGroups, setProfileGroups } = useContext(GlobalsContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [profileGroupIndex, setProfileGroupIndex] = useState(null)
    const [showGroups, setShowGroups] = useState(true)
    const [profileGroupID, setProfileGroupID] = useState('')
    const [showGroupProfiles, setshowGroupProfiles] = useState(false)
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectingRange, setSelectingRange] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [isEditting, setIsEditting] = useState(false);


    const deleteProfileGroup = (id) => {
        const newProfileGroupList = profileGroups.filter((_, index) => index !== id);
        setProfileGroups(newProfileGroupList)
        ipcRenderer.send('saveProfileGroups', newProfileGroupList)
    }
    const duplicateProfileGroup = (id) => {
        const dupGroup = profileGroups[id]

        const newProfileGroupList = [...profileGroups, { "name": `${dupGroup.name} Copy`, "id": uuidv4(), "profiles": dupGroup.profiles }]
        setProfileGroups(newProfileGroupList)
        ipcRenderer.send('saveProfileGroups', newProfileGroupList)
    }

    const editProfileGroup = () => {
        if (groupName === '') return
        const newProfileList = [...profileGroups];
        newProfileList[profileGroupIndex].name = groupName
        ipcRenderer.send('saveProfileGroups', newProfileList)
        setProfileGroups(newProfileList)
        setModalOpen(false)
        setIsEditting(false)
        setGroupName('')

    }

    const editProfileGroupHandler = (index) => {
        setIsEditting(true)
        setProfileGroupIndex((prevState) => {
            setGroupName(profileGroups[index].name)
            return index
        });
        setModalOpen(true)
    }
    const addProfileGroupHandler = () => {
        setModalOpen(true)
    }
    const addProfileGroup = () => {
        if (groupName === "") {
        }
        else {
            setModalOpen(false)
            const newProfileGroupObj = {
                name: groupName,
                id: uuidv4(),
                profiles: []
            }
            const newProfileGrouplist = [...profileGroups, newProfileGroupObj]
            ipcRenderer.send('saveProfileGroups', newProfileGrouplist)
            setProfileGroups(newProfileGrouplist)

        }

        setGroupName('')
    }

    const showProfiles = (id) => {
        setProfileGroupID(id)
        setShowGroups(false)
        setshowGroupProfiles(true)
        setSelectedGroups([])
    }



    const profileGroupsComp = () => {
        return (
            <div>
                <div className='profileGroup-header'>
                    <h1 className='addedProfilesGroup-header'>Profile Groups ({profileGroups.length})</h1>
                    <img src={addTaskGroupIcon} alt="" className='addProfileGroup-icon' onClick={addProfileGroupHandler} />
                    <img src={TrashIcon} alt="" className='deleteProfiles-icon' onClick={deleteSelectedGroups} />
                </div>
                <div className='profileGroups-div'>
                    {profileGroups.map((profile, index) => {
                        return (
                            <ProfileGroup name={profile.name} amount={profile.profiles.length} index={index} id={profile.id} key={profile.id} deleteGroup={deleteProfileGroup} duplicateGroup={duplicateProfileGroup} editProfileGroupHandler={editProfileGroupHandler} setProfileGroupIndex={setProfileGroupIndex} showProfiles={showProfiles} selectGroup={selectGroup} isSelecting={isSelecting} selectedGroups={selectedGroups}></ProfileGroup>
                        )

                    })}
                </div>
            </div>
        )
    }
    const selectGroup = (index) => {
        if (isSelecting) {
            if (selectingRange) {
                if (selectedGroups.find(group => group.id === profileGroups[index].id)) {
                    const newSelectedGroups = selectedGroups.filter(group => group.id !== profileGroups[index].id)
                    setSelectedGroups(newSelectedGroups)
                    return
                }
                setSelectedGroups([...selectedGroups, { ...profileGroups[index], index }])
                return
            }
            if (selectedGroups.find(group => group.id === profileGroups[index].id)) {
                const newSelectedGroups = selectedGroups.filter(group => group.id !== profileGroups[index].id)
                setSelectedGroups(newSelectedGroups)
                return
            }
            setSelectedGroups((prevState) => [...prevState, profileGroups[index]])
        }
    }

    const selectAllGroups = () => {
        if (isSelecting) {
            setSelectedGroups(profileGroups)
        }
    }

    const selectRange = (start, end) => {
        const newSelectedGroups = profileGroups.slice(start, end + 1)
        setSelectedGroups(newSelectedGroups)

    }

    const handleKeyPress = async ({ keyCode, shiftKey, ctrlKey, metaKey }) => {
        if (modalOpen) {
            return
        } else {
            if (shiftKey || ctrlKey || metaKey) {
                setIsSelecting(true)
            }
            if (ctrlKey && keyCode === 65) {
                selectAllGroups()
            }
            if (shiftKey) {
                setSelectingRange(true)
            }
        }



    }
    const handleUnsetRangeSelecting = async ({ keyCode, ctrlKey, shiftKey, metaKey }) => {
        if (modalOpen) return
        if (keyCode !== 16 && keyCode !== 17 && keyCode !== 18) return
        if (!ctrlKey && !shiftKey && !metaKey) {
            setIsSelecting(false);
        }
        if (keyCode === 16) {
            if (selectedGroups.length < 1) return
            selectRange(selectedGroups[0].index, selectedGroups[1].index)
        }

    }

    const deleteSelectedGroups = () => {
        if (selectedGroups.length === 0) return
        const newProfileGroups = profileGroups.filter((_, index) => !selectedGroups.find(group => group.id === profileGroups[index].id))
        setProfileGroups(newProfileGroups)
        ipcRenderer.send('saveProfileGroups', newProfileGroups)
        setSelectedGroups([])
        setIsSelecting(false)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        window.addEventListener('keyup', handleUnsetRangeSelecting);
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
            window.removeEventListener('keyup', handleUnsetRangeSelecting);
        }
    })


    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="profiles-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {showGroups ? profileGroupsComp() : null}
                        {showGroupProfiles ? <ProfilesComp showGroups={setShowGroups} showGroupProfiles={setshowGroupProfiles} groupID={profileGroupID} /> : null}
                        <ProfileGroupModal open={modalOpen} setOpen={setModalOpen} groupName={groupName} setGroupName={setGroupName} isEditting={isEditting} addProfileGroup={addProfileGroup} editProfileGroup={editProfileGroup} />
                    </motion.div>
                </>


            )}
        </AnimatePresence>
    )
}

export default profiles
