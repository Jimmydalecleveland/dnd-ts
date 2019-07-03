import express from 'express'
const app: express.Application = express();

app.get('/', (req, res) => res.send('DND Typescript devmode!'))

const port: number = 3000
app.listen(port, () => console.log(`Express Typescript running on ${port}`))
