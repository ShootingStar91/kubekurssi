const crypto = require("crypto");

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomString = crypto.randomBytes(16).toString("hex");

const run = async () => {
  while (true) {
    console.log(`${new Date()} ${randomString}`);
    await sleep(5000);
  }
};

run();
