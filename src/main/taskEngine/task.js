const os = require("os");
const fs = require("fs");
const winUser = os.userInfo().username;
const chalk = require("chalk");

let proxiesPath = `C:/Users/${winUser}/Vite/proxies.json`;
let profilePath = `C:/Users/${winUser}/Vite/profiles.json`;
export default class tasks {
  constructor(groupID, taskID, profile, proxy, size, site) {
    this.groupID = groupID;
    this.taskID = taskID;
    this.profile = profile;
    this.proxy = proxy;
    this.size = size;
    this.site = site;
    this.isRunning = false;
    this.eventTask;
  }

  async start() {
    this.isRunning = true;
  }

  async stop() {
    this.isRunning = false;
    this.updateStatus("Idle");
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  };

  async taskLogger(type, status) {
    let date_ob = new Date();
    let hour = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    if (type === "Msg") {
      console.log(
        chalk.yellow(`[${hour}:${minutes}:${seconds}]`) +
        chalk.cyan(` [Task ${this.taskID}]`) +
        ` [${this.site}]` +
        chalk.white(` ${status}`)
      );
    }
    if (type === "Error") {
      console.log(
        chalk.yellow(`[${hour}:${minutes}:${seconds}]`) +
        chalk.cyan(` [Task ${this.taskID}]`) +
        ` [${this.site}]` +
        chalk.red(` ${status}`)
      );
    }
    if (type === "Queue") {
      console.log(
        chalk.yellow(`[${hour}:${minutes}:${seconds}]`) +
        chalk.cyan(` [Task ${this.taskID}]`) +
        ` [${this.site}]` +
        chalk.yellow(` ${status}`)
      );
    }
    if (type === "Success") {
      console.log(
        chalk.yellow(`[${hour}:${minutes}:${seconds}]`) +
        chalk.cyan(` [Task ${this.taskID}]`) +
        ` [${this.site}]` +
        chalk.green(` ${status}`)
      );
    }
  }

  async randomProxy() {
    // let proxy;
    // let proxyJSON = JSON.parse(fs.readFileSync(proxiesPath, "utf8"));
    // proxyJSON.forEach((obj) => {
    //   Object.entries(obj).forEach(([key, value]) => {
    //     if (key === this.proxyName) {
    //       proxy = value;
    //     }
    //   });
    // });
    if (this.proxy === "localhost") {
      return null;
    }
    let randomProxy = proxy[Math.floor(Math.random() * proxy.length)];

    if (randomProxy !== "localhost") {
      let proxyParts = randomProxy.split(":");

      if (proxyParts[2] && proxyParts[3]) {
        let proxyAgent = {
          user: proxyParts[2],
          pass: proxyParts[3],
          ip: proxyParts[0],
          port: proxyParts[1],
        };
        // let proxyAgent = tunnel.httpsOverHttp({
        //   proxy: {
        //     host: proxyParts[0],
        //     port: proxyParts[1],
        //     proxyAuth: `${proxyParts[2]}:${proxyParts[3]}`,
        //   },
        // });
        return proxyAgent;
      } else {
        let proxyAgent = {
          user: proxyParts[2],
          pass: proxyParts[3],
          ip: proxyParts[0],
          port: proxyParts[1],
        };
        // let proxyAgent = tunnel.httpsOverHttp({
        //   proxy: {
        //     host: proxyParts[0],
        //     port: proxyParts[1],
        //   },
        // });
        return proxyAgent;
      }
    } else {
      return null;
    }
  }
  async getProfileInfo() {
    let profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"))[0].profiles;
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].name === this.profile) {
        let profiledata = profiles[i];
        return profiledata;
      }
    }
  }


  updateStatus(msg) {
    this.eventTask.sender.send("updateTasks-status", {
      id: this.taskID,
      groupID: this.groupID,
      status: msg,
    });
  }
}

