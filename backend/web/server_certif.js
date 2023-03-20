const express = require('express')
const app = express()
const PORT = 80

app.use(express.static('static', {dotfiles:'allow'} ))

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use((req, res, next) => {
  console.log(`Requesting ${req.url}`)
  return next()
})

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))
