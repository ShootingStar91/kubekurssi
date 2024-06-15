const express = require('express')

const PORT = process.env.PORT

const app = express()

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<html><body><h1>Hello kube world</h1><p>not much here</p></body></html>")
})

app.use(router)

app.listen(PORT, async () => {
    console.log("Server started.")
    console.log(`Running on port ${PORT}`)
})
