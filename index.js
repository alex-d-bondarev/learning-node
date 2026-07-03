require("dotenv").config()

const express = require("express")
const i18next = require("i18next")
const backend = require("i18next-fs-backend")
const middleware = require("i18next-http-middleware")

const app = express()
const port = 3000
const mongoose = require("mongoose")

const bookRouter = require("./routes/book.routes")

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: "locales/{{lng}}.json"
        }
    })

app.use(middleware.handle(i18next));
app.use(express.json());
app.use("/book", bookRouter);

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
