const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '619898b601d6437f91ea92858b577372',
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
let fears = []

app.post('/api/fear', (req, res)=>{
    let {name} = req.body
    name = name.trim()
    
    const index = fears.findIndex(Fear=> Fear === name)

    if(index === -1 && name !== ''){
        fears.push(name)
        rollbar.log('Student added successfully', {author: 'Bill', type: 'manual entry'})
        res.status(200).send(fears)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('must provide a name.')
    } else {
        rollbar.warning('student already exists')
        res.status(400).send('Warning: that student already exists')
    }

})

try {
    nonExistentFunction();
  } catch (error) {
    console.error(error);
    rollbar.warning('Example of a warning alert')
    rollbar.critical('RED ALERT: CRITICAL ALERT!');

    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }

const port = process.env.PORT || 4242

app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Take us to warp ${port}!`))