import React from 'react'
import { Group } from '@mantine/core'
import checkoutsIcon from '../../../images/checkouts-icon.png'


import './checkouts.css'
const checkouts = ({ checkouts }) => {
    return (
        <div className='checkouts-card'>
            <Group position="center" direction='column' spacing="1" style={{ paddingTop: 60 }}>
                <img src={checkoutsIcon} alt="" className='checkouts-icon' />
                <h1 className='num-checkouts'>{checkouts}</h1>
                <p className='total-checkouts'>Total Checkouts</p>
            </Group>
        </div>
    )
}

export default checkouts
