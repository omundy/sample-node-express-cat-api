

const express = require('express');
const app = express();
const port = 3000;


function testMiddleware(req,res,next){
    // heehlk
    console.log("hello from middleware")
    next()
}
function debugMiddleware(req,res,next){
    // heehlk
    console.log("hello from debug middleware", req.method)

    next()
}


app.get('/', testMiddleware, debugMiddleware, (req,res) => {
    // console.log(req)
    console.log("hello from callback")
    res.send("helo")
    // res.json({"message":"helo"})
});

// app.post("/", (req,res) => {
//     res.send('Got a POST request')
// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})