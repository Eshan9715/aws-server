import express from 'express'

const app = express()
const port = 8000

app.use('/api', (req,res,next)=>
    res.send('hellooo worlddd!!!!!')
);

app.listen(port,()=>console.log(`server is running on ${port}`));