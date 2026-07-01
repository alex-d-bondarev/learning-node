const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
const port = 3000

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.send("Hello page")
})

app.get("/about", (req, res) => {
    res.send("About page")
})

app.get("/contact", (req, res) => {
    res.send("Contact page")
})

app.get("/home", (req, res) => {
    res.send("Home page")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
