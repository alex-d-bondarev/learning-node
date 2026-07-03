require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

const bookRouter = require("./routes/book.routes")

app.use(express.json())
app.use("/book", bookRouter)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
