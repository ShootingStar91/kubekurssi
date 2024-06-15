const fs = require('fs').promises
const crypto = require('crypto')

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const makeString = () => `${new Date().toDateString()} ${crypto.randomBytes(16).toString("hex")}`

async function writeToFile(str) {
  const dir = "/usr/src/app/shared";
  const filePath = `${dir}/file`;

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, str, { flag: 'w' });
  } catch (error) {
    console.error('An error occurred in generator:', error);
  }
}

const run = async () => {
  while (true) {
    await sleep(5000)
    await writeToFile(makeString())
  }
}

run()
