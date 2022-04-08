const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

const password = "divyansh"
const myFirstDatabase = "Cluster0"
const mongoose = require("mongoose")
const Post = require('./models/Post')


// view engine
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(cors())

// connect to mongoDB
const dbURL = `mongodb+srv://divi2002:${password}@cluster0.wnwrx.mongodb.net/${myFirstDatabase}?retryWrites=true&w=majority`
mongoose.connect(dbURL)
    .then((result) => app.listen(3000))
    .catch((err) => { console.log(err) })

// import routes
const postRoute = require("./routes/posts")
app.use("/posts", postRoute)

app.get("/", (req, res) => {
    res.render("home", { name: "Divyansh" })
})

