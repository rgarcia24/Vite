import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { version } from '../../../../../package.json';
import logo from '../../images/vite.png'
import dashboardIcon from '../../images/dashboardIcon.png'
import taskIcon from '../../images/taskIcon.png'
import profileIcon from '../../images/profilesIcon.png'
import proxyIcon from '../../images/proxyIcon.png'
import accountsIcon from '../../images/accountsIcon.png'
import captchaIcon from '../../images/captchaIcon.png'
import settingsIcon from '../../images/settingsIcon.png'

import './nav.css'

const nav = () => {
    return (

        <>
            <div className='Nav'>
                <img src={logo} alt="" className='logo' />
                <div className='nav-icons'>
                    <NavLink exact to="/dashboard" activeClassName="active"><img src={dashboardIcon} alt="" /></NavLink>
                    <NavLink to="/tasks" activeClassName="active">  <img src={taskIcon} alt="" /></NavLink>
                    <NavLink to="/profiles" activeClassName="active"> <img src={profileIcon} alt="" /></NavLink>
                    <NavLink to="/proxies" activeClassName="active"><img src={proxyIcon} alt="" /></NavLink>
                    {/* <NavLink to="/accounts" activeClassName="active"> <img src={accountsIcon} alt="" /></NavLink> */}
                    <NavLink to="/captcha" activeClassName="active"> <img src={captchaIcon} alt="" /></NavLink>
                    <NavLink to="/settings" activeClassName="active"><img src={settingsIcon} alt="" /> </NavLink>
                </div>
                <h1 className='versionNum'>v{version}</h1>

            </div>
        </>
    )
}

export default nav
