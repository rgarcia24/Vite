import React, { useState, useRef, useEffect } from 'react'


import './clock.css'

const clock = () => {

    const [now, setNow] = useState(new Date());

    const [timerInterval, setTimerInterval] = useState(null);

    const isMounted = useRef(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isMounted.current) {
                setNow(new Date());
            }
        }, 1000);

        setTimerInterval(interval);

        return () => {
            isMounted.current = false
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }
    }, [])

    const getTime = () => {
        const zeroPad = (num) => {
            return ("0" + num).slice(-2)
        }
        return `${zeroPad((now.getHours() + 24) % 12 || 12)}:${zeroPad(now.getMinutes())}:${zeroPad(
            now.getSeconds()
        )}`
    }

    return (<h1 className='clock'>{getTime()} {(now.getHours() >= 12) ? "PM" : "AM"}</h1>)
}

export default clock
