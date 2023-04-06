import { BrowserWindow } from "electron";
import url from "url";
import path from "path";

let authWin = null;

const authWindow = (isDev) => {
  authWin = new BrowserWindow({
    width: 625,
    height: 500,
    center: true,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
      webSecurity: false,
      contextIsolation: false,
    },
  });

  if (isDev) {
    authWin.loadURL("http://localhost:3000#/auth");
  } else {
    authWin.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        hash: "/auth",
        protocol: "file",
        slashes: true,
      })
    );
  }

  // Detect if devtools was somehow opened outside development
  authWin.webContents.on("devtools-opened", () => {
    if (!isDev) {
      authWin.webContents.closeDevTools();
    }
  });
};

const closeAuthWin = () => {
  authWin.close();
};

export { authWindow, closeAuthWin };
