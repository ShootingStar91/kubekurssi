const express = require("express");

const app = express()

const router = new express.Router()

let counter = 0

router.get('/', (req, res) => {
  res.send("hello pingpong")
})

router.get('/pingpong', (req, res) => {
  res.send(`pong ${counter}`)
  counter += 1
})

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`String-app server running on port ${PORT}`)
})
