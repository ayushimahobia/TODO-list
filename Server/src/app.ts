import express,{ Express } from "express"
import mongoose, { Mongoose } from "mongoose"
import cors from "cors"
import "dotenv/config";
import todoroute from "./routes" // doubt

const app: Express = express()
const PORT :string | number = process.env.PORT || 4000;
app.use(express.json())
app.use(cors())
app.use(todoroute)
const str :string  = process.env.MONGO_URI_STRING || `mongodb+srv://ayushim235:ayushi23@cluster1.wiuswak.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(str!).then(() => {
    console.log("Connected to mongoDB")})
app.listen(PORT,()=>{
    console.log(`server is running on :${PORT}`)
})


