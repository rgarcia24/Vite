import tasks from "../taskEngine/task";
const got = require("got");
const { v4: uuidv4 } = require("uuid");
const tough = require("tough-cookie");

class footsites extends tasks {
  constructor(groupID, taskID, profile, proxy, size, site, sku) {
    super(groupID, taskID, profile, proxy, size, site);
    this.sku = sku;
    this.cookieJar = new tough.CookieJar();
    this.UUID = uuidv4().toString();
  }

  async startFlow() {
    this.updateStatus("Starting..");
    this.agent = await this.randomProxy();
    this.profileData = await this.getProfileInfo();
    this.start();
    await this.getSession();
    await this.getProduct();
    await this.addingToCart();
    return;
  }

  async getSession() {

    while (this.isRunning) {
      this.taskLogger("getting session")
      this.updateStatus("Getting session");
      try {
        let response = await got(`https://www.${this.site
      }.com/api/v5/session?timestamp=${Date.now().toString()}`, {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
            "x-fl-request-id": this.UUID,
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            referer: `https://www.${this.site}.com`,
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
          },
          throwHttpErrors: false,
          agent: {
            https: this.agent,
          },
          cookieJar: this.cookieJar,
        });

        if (response.statusCode === 200) {
          // this.taskLogger("Msg", "Got Session!");
          this.updateStatus("Got Session!");
          this.csrfToken = JSON.parse(response.body).data.csrfToken;
          return;
        }

        if (response.statusCode === 503 || response.statusCode === 529) {
          // this.taskLogger("Queue", "Waiting in Queue");
          this.updateStatus("Waiting in Queue");
          await this.sleep(5000);
        }
        if (response.statusCode === 429) {
          // this.taskLogger("Error", "Rate Limited, retrying...");
          this.updateStatus("Rate Limited, retrying...");
          await this.sleep(5000);
        }
      } catch {
        if (this.isRunning) {
          this.updateStatus("Error getting session");
          await this.sleep(5000);
        } else {
          return
        }

      }
    }
  }

  async getProduct() {
    while (this.isRunning) {
      this.updateStatus("Getting Product....");
      // console.log("Getting Product....");
      await this.sleep(5000);
    }
    return;
  }

  async addingToCart() {
    while (this.isRunning) {
      this.updateStatus("Adding to Cart....");
      // console.log("Getting Product....");
      await this.sleep(5000);
    }
    return;
  }

  async submitShipping() {
    while (this.isRunning) {
      console.log("Submitting shipping....");
    }
  }

  async submitBilling() {
    while (this.isRunning) {
      console.log("Submitting billing...");
    }
  }

  async placeOrder() {
    while (this.isRunning) {
      console.log("Placing order....");
    }
  }
}

export default footsites;
