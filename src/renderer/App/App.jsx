import React, { useState, useEffect, createContext } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Auth from './pages/Auth/auth'
import Dashboard from './pages/Dashboard/dashboard'
import Tasks from './pages/tasks/tasks'
import Profiles from './pages/profiles/profiles'
import Proxies from './pages/proxies/proxies'
import Accounts from './pages/accounts/accounts'
import Captcha from './pages/captcha/captcha'
import Settings from './pages/settings/settings'
import { ipcRenderer } from 'electron'
import GlobalsContext from './services/GlobalsContext';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core'
import { theme } from './styles/theme';


import './App.css';

function App() {
  const [dashAnalytics, setdashAnalytics] = useState({ checkouts: 0, carted: 0, declines: 0 });
  const [checkouts, setCheckouts] = useState([])
  const [siteCheckouts, setSiteCheckouts] = useState({ footsites: 0, shopfy: 0, YS: 0, JDFNL: 0, shopify: 0 })
  const [keyInfo, setKeyInfo] = useState({ avatar: '', username: 'N/A', keyType: 'N/A', licenseKey: 'N/A', expiry: 'N/A' })
  const [taskGroups, setTaskGroups] = useState([])
  const [profileGroups, setProfileGroups] = useState([])
  const [proxyList, setProxyList] = useState([])
  const [settings, setSettings] = useState({})


  const getData = async () => {
    // get data from the main process
    const data = await ipcRenderer.invoke('getStoreData');
    setdashAnalytics(data.dashAnayltics)
    setCheckouts(data.checkouts)
    setSiteCheckouts(data.siteCheckouts)
    setTaskGroups(data.tasks)
    setProfileGroups(data.profiles)
    setProxyList(data.proxies)
    setSettings(data.settings)
  };

  const getKeyInfo = async () => {
    // get data from the main process
    const data = await ipcRenderer.invoke('getKeyInfo');
    setKeyInfo(prevState => {
      return {
        ...prevState,
        avatar: data.avatar_url,
        username: data.DiscordUser,
        keyType: data.KeyType,
        licenseKey: data.LicenseKey,
        expiry: data.expiry
      }
    })


  }


  useEffect(() => {
    getData();
    getKeyInfo();
  }, []);

  let Globals = {
    dashAnalytics,
    checkouts,
    siteCheckouts,
    taskGroups,
    setTaskGroups,
    keyInfo,
    profileGroups,
    setProfileGroups,
    proxyList,
    setProxyList,
    settings,
    setSettings
  }

  return (
    <>
      <GlobalsContext.Provider value={{ ...Globals }}>
        <MantineProvider theme={theme}>
          <HashRouter>
            <Switch>
              <Route exact path='/auth' component={Auth} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/tasks' component={Tasks} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/proxies' component={Proxies} />
              <Route exact path='/accounts' component={Accounts} />
              <Route exact path='/captcha' component={Captcha} />
              <Route exact path='/settings' component={Settings} />
            </Switch>
          </HashRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            icon={true}
          />
        </MantineProvider>
      </GlobalsContext.Provider>
    </>

  );
}

export default App;


