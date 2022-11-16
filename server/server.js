const express = require("express")
const app = express()
const database = require("./configdatabase/index")
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const cors = require("cors")
const useRoute = require("./routes/userRoute")
const tourRoute = require("./routes/tourRoute")
const compression = require("compression")
const { createProxyMiddleware } = require("http-proxy-middleware")

const PORT = process.env.PORT || 3000

if(dotenv.error) {
    throw dotenv.error
}

database.connect()

app.use(cors())
app.disable("x-powered-by")
app.use(morgan("combined"))
app.use(express.json())
app.use("/api", createProxyMiddleware({
    target:"http://localhost:5000",
    changeOrigin: true
}))
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(compression())



app.use("/users", useRoute)
app.use("/tour", tourRoute)



app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING..${PORT}.....`)
})
