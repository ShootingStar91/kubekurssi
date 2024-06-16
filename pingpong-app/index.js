const fs = require('fs').promises
const express = require("express");

const app = express()

const router = new express.Router()

let counter = 0

router.get('/', (req, res) => {
  res.send("hello pingpong")
})

router.get('/pingpong', (req, res) => {
  writeToFile(counter + 1 + '')
  res.send(`pong ${counter}`)
  counter += 1
})

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`String-app server running on port ${PORT}`)
})


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
