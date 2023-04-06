import React from 'react'
import { Menu, Divider, Text } from '@mantine/core';
import { Trash, Edit, PlayerStop, PlayerPlay, Copy } from 'tabler-icons-react';
import { menuStyle } from './styles';

const DropDownMenu = ({ deleteTaskGroup, editTaskGroupAction, id, name, index, duplicateTaskGroup }) => {
    return (

        <Menu withArrow styles={menuStyle}>
            <Menu.Item color="green" icon={<PlayerPlay size={14} />}>Start</Menu.Item>
            <Menu.Item color="red" icon={<PlayerStop size={14} />}>Stop</Menu.Item>
            <Menu.Item color="orange" icon={<Edit size={14} />} onClick={() => editTaskGroupAction(index, name)}>Edit</Menu.Item>
            <Menu.Item color="cyan" icon={<Copy size={14} />} onClick={() => duplicateTaskGroup(index)}>Duplicate</Menu.Item>
            <Menu.Item color='red' icon={<Trash size={14} />} onClick={() => deleteTaskGroup(id)}>Delete</Menu.Item>
        </Menu >

    )
}

export default DropDownMenu