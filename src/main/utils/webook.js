import got from "got";

class Webhook {
  constructor(store) {
    this.store = store
  }

  async testWebhooks() {
    await this.testSuccessHook();
    await this.testFailureHook();
  }
  async testSuccessHook() {
    this.successHook = this.store.get("settings.successWebhook");
    let payload = {
      content: null,
      embeds: [
        {
          description: "Success Notification Test",
          color: 5645013,
          footer: {
            text: "Vite",
            icon_url:
              "https://cdn.discordapp.com/icons/813262933202042910/b632cc6c243dcc6455350ba4254bd54e.webp?size=1024",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      username: "Vite",
      avatar_url:
        "https://cdn.discordapp.com/icons/813262933202042910/b632cc6c243dcc6455350ba4254bd54e.webp?size=1024",
    };

    try {
      let response = await got.post(this.successHook, {
        headers: {
          "Content-Type": "application/json",
        },
        json: payload,
      });

      if (response.statusCode === 204) {
        console.log("Successfully sent webhook!");
      }
    } catch (e) {
      console.log("Failed to send webhook, check your webhook!");
    }
  }
  async testFailureHook() {
    this.failureHook = this.store.get("settings.failureWebhook");
    let payload = {
      content: null,
      embeds: [
        {
          description: "Failure Notification Test",
          color: 12388874,
          footer: {
            text: "Vite",
            icon_url:
              "https://cdn.discordapp.com/icons/813262933202042910/b632cc6c243dcc6455350ba4254bd54e.webp?size=1024",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      username: "Vite",
      avatar_url:
        "https://cdn.discordapp.com/icons/813262933202042910/b632cc6c243dcc6455350ba4254bd54e.webp?size=1024",
    };

    try {
      let response = await got.post(this.failureHook, {
        headers: {
          "Content-Type": "application/json",
        },
        json: payload,
      });

      if (response.statusCode === 204) {
        console.log("Successfully sent webhook!");
      }
    } catch {
      console.log("Failed to send webhook, check your webhook!");
    }
  }
  saveWebhooks(webhooks) {
    this.store.set("settings.successWebhook", webhooks[0]);
    this.store.set("settings.failureWebhook", webhooks[1]);
  }
}

export default Webhook;
