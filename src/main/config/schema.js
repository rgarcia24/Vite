const schema = {
  key: {
    type: "string",
    default: "",
  },
  dashAnayltics: {
    type: "object",
    default: {
      checkouts: 0,
      carted: 0,
      declines: 0,
    },
    properties: {
      checkouts: {
        type: "number",
        default: 0,
      },
      carted: {
        type: "number",
        default: 0,
      },
      declines: {
        type: "number",
        default: 0,
      },
    },
  },
  checkouts: {
    type: "array",
    default: [],
    items: {
      type: "object",
      properties: {
        site: {
          type: "string",
        },
        product: {
          type: "string",
        },
        size: {
          type: "string",
        },
        OrderNum: {
          type: "string",
        },
      },
    },
  },
  settings: {
    type: "object",
    default: {
      successWebhook: "",
      failureWebhook: "",
      checkoutSound: "default",
      quickTask: {
        profile: "",
        proxy: "",
        size: "",
        Mode: "",
      },
      autosolve: {
        apiKey: "",
        accessToken: "",
      },
    },
    properties: {
      successWebhook: {
        type: "string",
        default: "",
      },
      failureWebhook: {
        type: "string",
        default: "",
      },
      checkoutSound: {
        type: "string",
        default: "default",
      },
      quickTask: {
        type: "object",
        properties: {
          profile: {
            type: "string",
            default: "",
          },
          proxy: {
            type: "string",
            default: "",
          },
          size: {
            type: "string",
            default: "",
          },
          Mode: {
            type: "string",
            default: "",
          },
        },
      },
      autosolve: {
        type: "object",
        properties: {
          apiKey: {
            type: "string",
            default: "",
          },
          accessToken: {
            type: "string",
            default: "",
          },
        },
      },
    },
  },
  proxies: {
    type: "array",
    default: [],
    items: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        proxies: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
  },
  profiles: {
    type: "array",
    default: [],
    items: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        profiles: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              size: {
                type: "string",
                default: "",
              },
              profileGroup: {
                type: "string",
                default: "",
              },
              billingAddress: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  line1: { type: "string" },
                  line2: { type: "string" },
                  line3: { type: "string" },
                  postCode: { type: "string" },
                  city: { type: "string" },
                  country: { type: "string" },
                  state: { type: "string" },
                },
              },
              shippingAddress: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  line1: { type: "string" },
                  line2: { type: "string" },
                  line3: { type: "string" },
                  postCode: { type: "string" },
                  city: { type: "string" },
                  country: { type: "string" },
                  state: { type: "string" },
                },
              },
              paymentDetails: {
                type: "object",
                properties: {
                  nameOnCard: { type: "string" },
                  cardType: { type: "string" },
                  cardNumber: { type: "string" },
                  cardExpMonth: { type: "string" },
                  cardExpYear: { type: "string" },
                  cardCvv: { type: "string" },
                },
              },
              sameBillingAndShippingAddress: {
                type: "boolean",
              },
              onlyCheckoutOnce: {
                type: "boolean",
              },
              matchNameOnCardAndAddress: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
  tasks: {
    type: "array",
    default: [],
  },
};

export default schema;
