import React from 'react'
import Winbuttons from '../../components/winButtons/winbuttons'
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'


const accounts = () => {
    return (
        <>
            <Winbuttons />
            <Navbar />
            <Clock />
            <p className='test'>Accounts Page</p>
        </>
    )
}

export default accounts
