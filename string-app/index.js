const express = require("express");
const crypto = require("crypto");

const app = express()

const router = new express.Router()

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let randomString = crypto.randomBytes(16).toString("hex")

const getStatus = () => `${new Date()} ${randomString}` 

const run = async () => {
  while (true) {
    await sleep(5000)
    console.log(getStatus())
  }
}

router.get('/', (req, res) => {
  res.send(getStatus())
})

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`String-app server running on port ${PORT}`)
  run()
})
