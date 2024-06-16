// This is a part of the "project"
const express = require('express')
const request = require('request')
const util = require('util')
const fsAll = require('fs')
const fs = fsAll.promises
const stream = require('stream');

const PORT = process.env.PORT

const readFile = async () => {
    try {
      return await fs.readFile("/usr/src/app/shared/timestamp", { encoding: 'utf-8' })
    } catch (e) {
      return null
    }
}   

async function writeToFile(str) {
    const dir = "/usr/src/app/shared";
    const filePath = `${dir}/timestamp`;
  
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, str, { flag: 'w' });
    } catch (error) {
      console.error('An error occurred in generator:', error);
    }
}

const pipeline = util.promisify(stream.pipeline)

const downloadImage = async (url, filename) => {
    try {
        await pipeline(
            request(url),
            fsAll.createWriteStream(filename)
        )
    } catch (e) {
        console.log(`Failed downloading image, error: ${e}`)
    }
}

const app = express()

const router = express.Router()

app.use(express.static('shared'))

const isLessThanHour = timestamp => {
    return (new Date().getTime()) - (new Date(timestamp).getTime()) < 1000 * 60 * 60
}

router.get('/', async (req, res) => {
    const timestampString = await readFile("timestamp")
    const timestamp = parseInt(timestampString)
    if (!timestamp || !isLessThanHour(timestamp)) {
        await downloadImage("https://picsum.photos/1200", "shared/image.jpg")
        await writeToFile(new Date().getTime() + '')
    }
    const filePath = `image.jpg`
    return res.send(`<html><body><h1>Hello kube world</h1><p><img src="${filePath}" /></p></body></html>`)
})

router.get('/shutdown', (req, res) => {
    process.exit(0)
})

app.use(router)

app.listen(PORT, async () => {
    console.log("Server started.")
    console.log(`Running on port ${PORT}`)
})
