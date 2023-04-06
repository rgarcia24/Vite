import { app, ipcMain, shell, dialog } from "electron";
import authentication from "./utils/auth";
import Webhook from "./utils/webook";
import FootsiteTask from "./sites/footsites";
import TaskEngine from "./taskEngine/taskEngine";
import StoreSchema from "./config/schema.js";
import Store from "electron-store";
import { authWindow, closeAuthWin } from "./windows/authWin";
import { mainApp, minimizeWindow } from "./windows/mainWin";
import fs from "fs";


let tasksLoaded = [];
let store;
const client = require("discord-rich-presence")("816021303428644874");
const isDev = process.env.ELECTRON_ENV == "dev";

app.disableHardwareAcceleration()

// create electron store config
store = new Store({
  schema: StoreSchema,
  fileExtension: ".json",
});

const auth = new authentication(store);
const hook = new Webhook(store)

const startSetup = async () => {
  client.updatePresence({
    state: "v1.0.0",
    // details: "Eating",
    startTimestamp: Date.now(),
    largeImageKey: "vite",
    // smallImageKey: 'small_emoji',
    instance: true,
  });

  // block multiple instances
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  }

  // authenticates at startup
  let authMsg = await auth.authenticate();
  if (authMsg.Activate) {
    // const taskEngine = new TaskEngine(folderName)
    // load tasks in memory
    // tasksLoaded = taskEngine.loadTasks();
    mainApp(isDev);
  } else {
    authWindow(isDev);
  }
};

ipcMain.on("checkAuth", async (event, key) => {
  let isActivated = await auth.keyAuth(key);
  if (isActivated.Activate) {
    setTimeout(() => {
      mainApp(isDev);
    }, 1000);
  }
  event.sender.send("isAuthReply", isActivated);
});

ipcMain.on("saveKey", (event, key) => {
  auth.saveKey(key);
  setTimeout(() => {
    closeAuthWin();
  }, 1000);
});

ipcMain.on("saveWebhooks", (event, webhooks) => {

  hook.saveWebhooks(webhooks);
});
ipcMain.on("testWebhooks", async (event) => {
  await hook.testWebhooks();
});


ipcMain.handle("getKeyInfo", async (event) => {
  let keyInfo = await auth.getKeyInfo();
  return keyInfo;
});



ipcMain.on("goToDashboard", () => {
  shell.openExternal("https://github.com");
});

ipcMain.on("changeSound", (event) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.canceled) {
        return;
      }
      store.set("settings.checkoutSound", result.filePaths[0]);
      event.sender.send("updateSoundPath", result.filePaths[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

ipcMain.on("saveProxyList", (event, proxyList) => {
  store.set("proxies", proxyList);
});

ipcMain.on("saveTaskGroups", (event, taskGroups) => {
  store.set("tasks", taskGroups);
});

ipcMain.on("saveProfileGroups", (event, profileGroups) => {
  store.set("profiles", profileGroups);
});

ipcMain.on("importProfiles", (event, groupID) => {
  dialog
    .showOpenDialog({
      properties: ["openFile"],
    })
    .then((result) => {
      if (result.canceled) {
        return;
      }
      let profilesData = store.get("profiles");
      let importedProfiles = JSON.parse(fs.readFileSync(result.filePaths[0]));
      profilesData[groupID].profiles.push(...importedProfiles);

      store.set("profiles", profilesData);

      event.sender.send("ImportedProfilesData", profilesData[groupID].profiles);
    })
    .catch((err) => {
      event.sender.send("ImportedProfilesData", { error: true });
    });
});

ipcMain.on("exportProfiles", (event, groupID) => {
  const options = {
    title: "Export Profiles",
    filters: [{ name: "profiles", extensions: ["json"] }],
  };
  let profilesData = store.get("profiles");
  let saveDialog = dialog.showSaveDialog(options);
  saveDialog.then(function (result) {
    if (result.canceled) {
      return;
    }
    const profiles = JSON.stringify(profilesData[groupID].profiles);
    fs.writeFileSync(result.filePath, profiles, "utf8");
  });
});

// ipcMain.on("exportAll", (event) => {
//   const options = {
//     title: "Export All Data",
//     filters: [{ name: "Data", extensions: ["json"] }],
//   };
//   let saveDialog = dialog.showSaveDialog(options);
//   saveDialog.then(function (result) {
//     if (result.canceled) {
//       return;
//     }
//     const data = JSON.stringify(store.store);
//     fs.writeFileSync(result.filePath, data, "utf8");
//   });
// })
// ipcMain.on("importAll", (event) => {
//   dialog
//     .showOpenDialog({
//       properties: ["openFile"],
//     })
//     .then((result) => {
//       if (result.canceled) {
//         return;
//       }
//       let profilesData = store.get("profiles");
//       let importedProfiles = JSON.parse(fs.readFileSync(result.filePaths[0]));
//       profilesData[groupID].profiles.push(...importedProfiles);

//       store.set("profiles", profilesData);

//       event.sender.send("ImportedProfilesData", profilesData[groupID].profiles);
//     })
//     .catch((err) => {
//       event.sender.send("ImportedProfilesData", { error: true });
//     });
// })


// ipcMain.on("startAll", (event, groupID) => {
//   tasksLoaded.map((task) => {
//     if (task.groupID === groupID) {
//       task.eventTask = event;
//       task.startFlow();
//     }
//   });
// })
// ipcMain.on("stopAll", (event, groupID) => {
//   tasksLoaded.map((task) => {
//     if (task.groupID === groupID) {
//       task.stop();
//     }
//   });

// })

// ipcMain.on("start-task", async (event, id) => {

// });

// ipcMain.on("stop-task", (id) => {

// });
ipcMain.handle("getStoreData", (event) => {
  return JSON.parse(JSON.stringify(store.store));
});
ipcMain.on("closeapp", () => {
  app.quit();
});

ipcMain.on("minimizeapp", () => {
  minimizeWindow();
});

app.on("ready", async () => {
  await startSetup();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // if (mainWindow === null) {
  //   renderWindow();
  // }
});
