import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'

const keyInput = (props) => {

    const inputStyle = makeStyles({
        root: {
            backgroundColor: '#1C253F',
            marginTop: '10px',
            marginLeft: '70px',
            marginRight: 'auto',
            height: '10px',
            width: '500px',
            fontFamily: 'sans-serif',
            underline: {
                "&&&:before": {
                    borderBottom: "none"
                },
                "&&:after": {
                    borderBottom: "none"
                }
            },
            '& label.Mui-focused': {
                color: '#111317',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#111317',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#111317',
                },
                '&:hover fieldset': {

                    borderColor: '#111317',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#111317',
                },
            },
        }
    })
    const inputClass = inputStyle();
    return (
        <div className='authInput-div'>
            <TextField className={inputClass.root} noValidate id="outlined-basic" variant="outlined" spellCheck='false' placeholder='XXXX-XXXX-XXXX-XXXX-XXXX' onChange={(e) => props.getValue(e)} />
        </div>
    )
}

export default keyInput
