import React, { useState, useContext } from 'react'
import { Modal, Button, Group, TextInput } from '@mantine/core'
import { buttonStyle, modalStyle, inputStyle } from './styles'


const ProfileGroupModal = ({ open, setOpen, isEditting, groupName, setGroupName, addProfileGroup, editProfileGroup }) => {


    const closeModalHandler = () => {
        setOpen(false)
    }

    const handleSave = () => {
        if (isEditting) {
            editProfileGroup()
        } else {
            addProfileGroup()
        }

    }

    return (
        <>
            <Modal
                opened={open}
                onClose={closeModalHandler}
                title="Profile Group"
                centered
                size="lg"
                styles={modalStyle}>

                <TextInput
                    placeholder="Test Group 1"
                    label="Group Name"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={groupName}
                    onChange={(e) => { setGroupName(e.currentTarget.value) }}
                    styles={inputStyle}
                />
                <Group position="apart" mt="md">
                    <Button styles={buttonStyle} color="violet" onClick={closeModalHandler}>
                        Cancel
                    </Button>
                    <Button styles={buttonStyle} color="violet" onClick={handleSave}>
                        {isEditting ? 'Save' : 'Create'}
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

export default ProfileGroupModal