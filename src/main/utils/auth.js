import got from "got";

class Auth {
  constructor(store) {
    this.store = store
    this.apiURL = "https://viteapi.rgarcia.tech/api"
  }
  async getIp() {
    let response = await got("https://api.ipify.org?format=json");
    this.ip = JSON.parse(response.body).ip;
  }

  async checkAuth() {
    let key = this.store.get('key')
    if (key === "") {
      return { Activated: false, Msg: "Empty Key Field" };
    } else {
      try {
        let keyResponse = await got.post(
          `${this.apiURL}/checkKey`,
          {
            json: {
              key: key,
              IP: this.ip,
            },
          }
        );

        let responseData = JSON.parse(keyResponse.body);

        if (responseData.msg == "Valid key") {
          return { Activate: true, Msg: "Key Activated" };
        }
        if (responseData.msg == "Activated on a different machine!") {
          return { Activate: false, Msg: "Activated on a different machine" };
        }
        if (responseData.msg == "Invalid key") {
          return { Activate: false, Msg: "Invalid Key" };
        }
      } catch (e) {
        console.error(e)
        return { Activate: false, Msg: "Error contacting Auth Server" };
      }
    }
  }
  async keyAuth(key) {
    await this.getIp();
    try {
      let keyResponse = await got.post(
        `${this.apiURL}/checkKey`,
        {
          json: {
            key: key,
            IP: this.ip,
          },
        }
      );

      let responseData = JSON.parse(keyResponse.body);

      if (responseData.msg == "Valid key") {
        return { Activate: true, Msg: "Key Activated" };
      }
      if (responseData.msg == "Activated on a different machine!") {
        return { Activate: false, Msg: "Activated on a different machine" };
      }
      if (responseData.msg == "Invalid key") {
        return { Activate: false, Msg: "Invalid Key" };
      }
    } catch (e) {
      console.error(e)
      return { Activate: false, Msg: "Error contacting Auth Server" };
    }
  }

  saveKey(key) {
    this.store.set('key', key)
  }

  async getKeyInfo() {
    let key = this.store.get("key");
    let response = await got.post(
      `${this.apiURL}/keyInfo`,
      {
        json: {
          key: key,
        },
      }
    );
    return JSON.parse(response.body);
  }

  async authenticate() {
    await this.getIp();
    const authMsg = await this.checkAuth();
    return authMsg;
  }
}
export default Auth;
