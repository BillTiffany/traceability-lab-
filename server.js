const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: 'ec44c98d9f6d448690fe8a967482e9f7',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()

app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4242
app.listen(port, () => console.log(`Take us to warp ${port}!`))