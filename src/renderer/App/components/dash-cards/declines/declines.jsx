import React from 'react'
import { Group } from '@mantine/core'
import declineIcon from '../../../images/declines-icon.png'

import './declines.css'
const declines = ({ declines }) => {
    return (
        <div className='declines-card'>
            <Group position="center" direction='column' spacing="1" style={{ paddingTop: 60 }}>
                <img src={declineIcon} alt="" className='declines-icon' />
                <h1 className='num-declines'>{declines}</h1>
                <p className='total-declines'>Total Declines</p>
            </Group>
        </div>
    )
}

export default declines
