import React from 'react'
import proxies from '../../pages/proxies/proxies'

import './proxyInput.css'
const proxyInput = ({ getProxyName, proxyName }) => {
    const setProxyName = (e) => {
        let proxiesName = e.target.value
        getProxyName(proxiesName)
    }
    return (
        <input
            type="text"
            placeholder='Proxy List Name'
            className='proxyName-input'
            spellCheck='false'
            onChange={(e) => setProxyName(e)}
            value={proxyName}
            maxLength='50'
        />
    )
}

export default proxyInput
