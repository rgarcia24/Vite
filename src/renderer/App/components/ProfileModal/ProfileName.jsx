import React, { useContext } from 'react'
import { TextInput } from '@mantine/core'
import ProfilesContext from '../../services/ProfilesContext'
import { inputStyle } from './styles'

const ProfileName = () => {

    const { profile, onChangeHandler } = useContext(ProfilesContext)

    return (
        <>
            <TextInput
                placeholder="Test Profile"
                label="Profile Name"
                radius="md"
                variant='default'
                required
                defaultValue={profile.name}
                onChange={(e) => { onChangeHandler(e.currentTarget.value, 'name') }}
                styles={inputStyle}
            />
        </>
    )
}

export default ProfileName