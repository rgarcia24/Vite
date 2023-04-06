import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import MinimizeIcon from '@material-ui/icons/Minimize';
import { makeStyles } from '@material-ui/styles';
import { ipcRenderer } from 'electron'

const winbuttons = () => {
    const minimizeApp = () => {
        ipcRenderer.send('minimizeapp')
    }
    const closeApp = () => {
        ipcRenderer.send('closeapp');
    }

    const minimizeStyles = makeStyles({
        root: {

            color: 'white',
            cursor: 'pointer',
            marginLeft: '-25px',
            marginTop: '-8.2px',
            position: 'fixed',

        }

    })
    const closeStyle = makeStyles({
        root: {
            color: 'white',
            cursor: 'pointer',

        },

    })

    const minimizeClass = minimizeStyles();
    const closeClass = closeStyle();
    return (
        <div className="win-btns">
            <MinimizeIcon fontSize='small' className={minimizeClass.root} color='primary' onClick={minimizeApp}></MinimizeIcon>
            <CloseIcon fontSize='small' className={closeClass.root} color='primary' onClick={closeApp}></CloseIcon>
        </div>
    )
}

export default winbuttons
