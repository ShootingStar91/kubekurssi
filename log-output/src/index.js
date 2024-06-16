const express = require('express')
const crypto = require('crypto')
const fs = require('fs').promises

const PORT = process.env.PORT | 3000

const app = express()

const router = express.Router()

const makeString = () => `${new Date().toDateString()} ${crypto.randomBytes(16).toString("hex")}`

async function readFromFile() {
  const filePath = `/usr/src/app/shared/file`;
  try {
    const result = await fs.readFile(filePath, { encoding: 'utf-8'});
    console.log("Read: " + result)
    return result
  } catch (error) {
    console.error('An error occurred when reading a file:', error);
  }
}

router.get('/', async (req, res) => {
    const pings = await readFromFile()
    res.send(`${makeString()}\nPings: ${pings}`)
})

app.use(router)

app.listen(PORT, async () => {
    console.log("Server started.")
    console.log(`Running on port ${PORT}`)
})
