import React, { useContext, useState } from 'react'
import ProfileComp from './profileRowComp'
import { ipcRenderer } from 'electron'
import './profilesComp.css'
import importIcon from '../../images/importIcon.png'
import exportIcon from '../../images/exportIcon.png'
import backIcon from '../../images/backIcon.png'
import GlobalsContext from '../../services/GlobalsContext';
import addProfileIcon from '../../images/addTaskGroup.png'
import ProfileModal from '../../components/ProfileModal'
import ProfilesContext from '../../services/ProfilesContext'
import ProfileSchema from './ProfileSchema'
import { Group } from '@mantine/core'
import Notification from '../../services/notification'
const Notify = new Notification()

const profilesComp = ({ showGroups, showGroupProfiles, groupID, }) => {

    const { profileGroups, setProfileGroups } = useContext(GlobalsContext)
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(ProfileSchema)
    const [editingProfile, setEditingProfile] = useState(false)
    const [editID, setEditID] = useState(null)

    const deleteProfiles = (id) => {
        const newProfileList = profileGroups[groupID].profiles.filter((_, index) => index !== id);

        const newProfileGroups = [...profileGroups]
        newProfileGroups[groupID].profiles = newProfileList

        setProfileGroups(newProfileGroups)

        ipcRenderer.send('saveProfileGroups', newProfileGroups)
    }
    const addProfileHandler = () => {
        setOpen(true)
    }
    const editProfile = (id) => {
        setEditID(id)
        setOpen(true)
        setEditingProfile(true)
        setProfile(profileGroups[groupID].profiles[id])
    }


    const importProfiles = () => {
        ipcRenderer.send('importProfiles', groupID);
        ipcRenderer.once('ImportedProfilesData', (event, profilesData) => {
            if (profilesData.error) {
                Notify.error('Failed to Import Profiles');
                return
            }
            const newProfileGroups = [...profileGroups]
            newProfileGroups[groupID].profiles = profilesData

            setProfileGroups(newProfileGroups)

            Notify.success('Successfully Imported Profiles');
        })
    }

    const exportProfiles = () => {
        ipcRenderer.send('exportProfiles', groupID);
    }


    const saveProfile = () => {
        if (editingProfile) {
            let newProfileGroups = [...profileGroups]
            newProfileGroups[groupID].profiles[editID] = profile
            setProfileGroups(newProfileGroups)
            ipcRenderer.send('saveProfileGroups', newProfileGroups)
            return
        }
        let newProfileGroups = [...profileGroups]
        newProfileGroups[groupID].profiles = [...newProfileGroups[groupID].profiles, profile]
        setProfileGroups(newProfileGroups)
        ipcRenderer.send('saveProfileGroups', newProfileGroups)
    }

    const onChangeHandler = (value, type) => {
        if (type.includes('.')) {
            const [parent, child] = type.split('.')
            setProfile((prevState) => {
                return {
                    ...prevState,
                    [parent]: {
                        ...prevState[parent],
                        [child]: value
                    }
                }
            })
        } else {
            setProfile((prevState) => {
                return {
                    ...prevState,
                    [type]: value
                }
            })
        }

    }


    return (
        <ProfilesContext.Provider value={{ profile, setProfile, onChangeHandler, saveProfile }}>
            <div>
                <div className='profileActions-div'>
                    <img src={importIcon} alt="" className='importIcon' onClick={importProfiles} />
                    <img src={exportIcon} alt="" className='exportIcon' onClick={exportProfiles} />
                </div>
                <Group style={{ width: "400px", marginLeft: "120px", marginTop: "-50px" }}>
                    <img src={backIcon} alt="" className='backIcon' onClick={() => { showGroups(true); showGroupProfiles(false) }} />
                    <h1 className='profiles-header'>Profiles</h1>
                    <h1 className='profiles-header'>({profileGroups[groupID].profiles.length})</h1>
                    <img src={addProfileIcon} alt="" className='addProfile-icon' onClick={addProfileHandler} />
                </Group>
                <div className='profile-header-table'>
                    <p className='profile-Name'>Profile</p>
                    <p className='profile-CardHolder'>Name</p>
                    <p className='profile-Email'>Email</p>
                    <p className='profile-PhoneNumber'>Phone Number</p>
                    <p className='profile-Address'>Address</p>
                    <p className='profile-Type'>Type</p>
                    <p className='profile-Expiry'>Expiry</p>
                    <p className='profile-Card'>4 Digit</p>
                </div>
                <div className='profiles'>
                    {profileGroups[groupID].profiles.map((profile, index) => {
                        return (<ProfileComp profile={profile} key={index} index={index} deleteProfiles={deleteProfiles} editProfile={editProfile} />)
                    })}
                </div>
                <ProfileModal open={open} setOpen={setOpen} />


            </div >
        </ProfilesContext.Provider>


    )
}

export default profilesComp
