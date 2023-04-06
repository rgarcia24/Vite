import { BrowserWindow } from "electron";
import url from "url";
import path from "path";
import os from "os";

let mainWin = null;

const mainApp = (isDev) => {
  mainWin = new BrowserWindow({
    width: 1440,
    height: 780,
    resizable: false,
    center: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      contextIsolation: false,
      devTools: isDev,
    },
  });

  // for some reason it doesnt properly set the size on linux
  // probably because of kde acting weird

  if (os.platform() === "linux") {
    mainWin.setSize(1440, 780);
    mainWin.center();
  }

  if (isDev) {
    mainWin.loadURL("http://localhost:3000#/dashboard");
    mainWin.webContents.openDevTools();
  } else {
    mainWin.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        hash: "/dashboard",
        protocol: "file",
        slashes: true,
      })
    );
  }

  // Detect if devtools was somehow opened outside development
  mainWin.webContents.on("devtools-opened", () => {
    if (!isDev) {
      mainWin.webContents.closeDevTools();
    }
  });
};

const minimizeWindow = () => {
  mainWin.minimize();
};


export { mainApp, minimizeWindow };
