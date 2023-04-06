import React from 'react'
import { Modal, Button, Group, TextInput, Textarea } from '@mantine/core'
import { buttonStyle, modalStyle, inputStyle, textAreaStyle } from './styles'

const ProxyModal = ({ setOpen, open, editProxyName, setEditProxyName, editProxies, setEditProxies, saveEditProxies }) => {
    const closeModalHandler = () => {
        setOpen(false)
    }

    const getProxies = (e) => {
        let proxies = []
        let proxiesValues = e.target.value
        proxies = proxiesValues.split('\n')
        setEditProxies(proxies)
    }

    const getProxyName = (e) => {
        let proxiesName = e.target.value
        setEditProxyName(proxiesName)
    }


    return (
        <>
            <Modal
                opened={open}
                onClose={closeModalHandler}
                title="Edit Proxy List"
                centered
                size="lg"
                styles={modalStyle}>
                <Textarea
                    placeholder="ip:port:username:password"
                    label="Proxies"
                    required
                    variant='default'
                    autosize
                    radius="md"
                    styles={textAreaStyle}
                    minRows={15}
                    maxRows={15}
                    defaultValue={editProxies.join('\n')}
                    onChange={(e) => { getProxies(e) }}
                    spellCheck={false}
                />
                <TextInput
                    placeholder="ISPS 1"
                    label="Group Name"
                    radius="md"
                    variant='default'
                    required
                    defaultValue={editProxyName}
                    onChange={(e) => { getProxyName(e) }}
                    styles={inputStyle}
                />
                <Group position="apart" mt="md">
                    <Button styles={buttonStyle} color="violet" onClick={closeModalHandler}>
                        Cancel
                    </Button>
                    <Button styles={buttonStyle} color="violet" onClick={saveEditProxies}>
                        Save
                    </Button>
                </Group>
            </Modal>
        </>
    )
}

export default ProxyModal