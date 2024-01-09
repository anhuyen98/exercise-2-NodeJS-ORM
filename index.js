import express from 'express';
import rootRoutes from './src/routes/rootRoutes.js';
import cors from 'cors'

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors())
app.use(rootRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to my server')
})

app.listen(port, () => {
    console.log(`Server is starting with port ${port}`);
})