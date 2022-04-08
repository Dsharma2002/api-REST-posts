const express = require("express")
const Post = require("../models/Post")
const router = express.Router()

// Get all the posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

// Submit a post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

// get a particular post
router.get("/:id", (req, res) => {
    const id = req.params.id
    Post.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json({ message: err }))
})

// delete a specific post
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Post.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json({ message: err }))
})

// update a specific post
router.patch("/:id", (req, res) => {
    Post.updateOne({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    })
        .then(result => res.json(result))
        .catch(err => res.json({ message: err }))
})


module.exports = router