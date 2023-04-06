import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const authButton = (props) => {
    const useStyles = makeStyles({
        root: {
            background: 'linear-gradient(91.89deg, #6243AC 2.34%, #A169EF 100%)',
            borderRadius: '5px',
            color: 'white',
            marginTop: '1px',
            marginLeft: '180px',
            width: '270px',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
        }
    })
    const classes = useStyles();
    return (
        <Button className={classes.root} variant="contained" color="primary" disableRipple={false} onClick={props.msg}>Authenticate</Button>
    )
}

export default authButton
