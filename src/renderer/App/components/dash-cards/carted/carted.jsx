import React from 'react'
import { Group } from '@mantine/core'
import cartedIcon from '../../../images/carted-icon.png'


import './carted.css'
const carted = ({ carted }) => {
    return (
        <div className='carted-card'>
            <Group position="center" direction='column' spacing="1" style={{ paddingTop: 60 }}>
                <img src={cartedIcon} alt="" className='carted-icon' />
                <h1 className='num-carted'>{carted}</h1>
                <p className='total-carted'>Total Carted</p>
            </Group>
        </div>
    )
}

export default carted
