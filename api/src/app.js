import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import foodRouter from "./routes/food.route.js"
import requestRouter from "./routes/request.route.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/foods", foodRouter)
app.use("/api/v1/requests", requestRouter)

app.use((err, req, res, next) => {
    // 
    const statusCode = err.statusCode || 501;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: "false",
        message,
        statusCode
    })

})

app.get("/", (req, res) => {
    res.send("Hello World")
})



export { app }