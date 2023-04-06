import React from 'react'
import { Modal, Button, Group, TextInput } from '@mantine/core'
import { buttonStyle, modalStyle, inputStyle } from './styles'


const TaskGroupModal = ({ open, setOpen, isEditting, groupName, setGroupName, addTaskGroup, editTaskGroup }) => {


    const closeModalHandler = () => {
        setOpen(false)
    }

    const handleSave = () => {
        if (isEditting) {
            editTaskGroup()
        } else {
            addTaskGroup()
        }

    }

    return (
        <>
            <Modal
                opened={open}
                onClose={closeModalHandler}
                title="Task Group"
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

export default TaskGroupModal