import express from "express"
import dbConnect from "./config/dbConnection.js"
import routes from "./routes/index.js"
import cors from 'cors';

const connect = await dbConnect()

connect.on("erro", (err) => {
  console.error(err)
})

connect.once("open", () => {
  console.log("Database connect sucessful")
})

const app = express()
app.use(express.json())
app.use(cors())
routes(app)

export default app
