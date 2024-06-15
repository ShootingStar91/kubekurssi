const fs = require('fs').promises

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getStatus = async () => {
  try {
    return await fs.readFile("/usr/src/app/shared/file", { encoding: 'utf-8' })
  } catch (e) {
    return "generator not ready yet"
  }
} 

const run = async () => {
  while (true) {
    await sleep(5000)
    const status = await getStatus()
    console.log(status)
  }
}

run()
