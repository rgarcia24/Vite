import React, { useState, useContext } from 'react'
import Winbuttons from '../../components/winButtons/winbuttons'
import Navbar from '../../components/navbar/nav'
import Clock from '../../components/clock/clock'
import ProxyFieldText from '../../components/proxyTextField/proxyField'
import SaveProxyBtn from '../../components/saveProxyBtn/saveProxyBtn'
import ProxyNameInput from '../../components/proxyNameInput/proxyInput'
import ProxyComp from '../../components/proxyComp/proxyComp'
import { ipcRenderer } from 'electron'
import GlobalsContext from '../../services/GlobalsContext'
import { v4 as uuidv4 } from 'uuid';
import ProxyModal from '../../components/ProxyModal'
import { AnimatePresence, motion, useCycle } from 'framer-motion'


import './proxies.css'
const proxies = () => {

    const { proxyList, setProxyList } = useContext(GlobalsContext)
    const [proxies, setProxy] = useState([])
    const [proxyName, setProxyName] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [modalID, setModalID] = useState(0);
    const [editProxyName, setEditProxyName] = useState('');
    const [editProxies, setEditProxies] = useState([]);
    const [isVisible, onCycle] = useCycle(true, false);



    const deleteProxy = (id) => {
        const newProxyList = proxyList.filter((proxy, index) => proxy.groupID !== id);
        setProxyList(newProxyList)
        ipcRenderer.send('saveProxyList', newProxyList)
    }
    const editProxy = (id) => {
        setModalOpen(true)
        setModalID(id)
        setEditProxies(proxyList.find(proxy => proxy.groupID === id).proxies)
        setEditProxyName(proxyList.find(proxy => proxy.groupID === id).name)
    }

    const setProxies = (proxy) => {
        setProxy(proxy)
    }

    const getProxyName = (proxyName) => {
        setProxyName(proxyName)
    }

    const saveProxies = () => {
        if (proxyName === "" || proxies.length === 0) {
            return
        }


        const newProxyObj = {
            name: proxyName,
            proxies: proxies,
            groupID: uuidv4()
        }
        const newProxylist = [...proxyList, newProxyObj]
        ipcRenderer.send('saveProxyList', newProxylist)
        setProxyList(newProxylist)
        setProxy([])
        setProxyName('')



    }

    const saveEditProxies = () => {
        if (editProxies.length === 0 || editProxyName === '') {

            return
        }
        else {
            const newProxyList = [...proxyList];
            newProxyList.forEach((proxy, index) => {
                if (proxy.groupID === modalID) {
                    newProxyList[index].name = editProxyName
                    newProxyList[index].proxies = editProxies
                }
            })
            ipcRenderer.send('saveProxyList', newProxyList)
            setProxyList(newProxyList)
            setEditProxies([])
            setEditProxyName('')
            setModalOpen(false)
        }

    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <Winbuttons />
                    <Navbar />
                    <Clock />
                    <motion.div
                        key="proxy-page"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProxyFieldText setProxies={setProxies} proxiesState={proxies} ></ProxyFieldText>
                        <ProxyNameInput getProxyName={getProxyName} proxyName={proxyName}></ProxyNameInput>
                        <SaveProxyBtn saveProxy={saveProxies}></SaveProxyBtn>
                        <h1 className='proxy-header'>Proxy</h1>
                        <div className='proxy-tableHeader'>
                            <h1 className='proxy-Name'>Name</h1> <h1 className='proxy-Amount'>Amount</h1>

                        </div>
                        <div className='proxy-List'>
                            {proxyList.map((proxy, index) => {
                                return (
                                    <ProxyComp name={proxy.name} ammount={proxy.proxies.length} key={index} id={proxy.groupID} deleteProxy={deleteProxy} editProxy={editProxy} />
                                )
                            })}
                        </div>
                        <ProxyModal open={modalOpen} setOpen={setModalOpen} editProxyName={editProxyName} setEditProxyName={setEditProxyName} setEditProxies={setEditProxies} editProxies={editProxies} saveEditProxies={saveEditProxies} />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default proxies
