import React from 'react'



import './proxyField.css'
const proxyField = ({ setProxies, proxiesState }) => {

    let proxies = [];
    const getProxies = (e) => {
        let proxiesValues = e.target.value
        proxies = proxiesValues.split('\n')
        setProxies(proxies)
    }

    return (
        <div className='proxyField-card'>
            <textarea
                name="proxy-field"
                id="proxy-field"
                cols="30"
                rows="10"
                placeholder='ip:port:user:pass'
                spellCheck="false"
                onChange={(e) => getProxies(e)}
                value={proxiesState < 1 ? "" : proxiesState.join('\n')}
            >

            </textarea>
        </div>
    )
}

export default proxyField
