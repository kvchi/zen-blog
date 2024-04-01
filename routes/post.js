const route = require("express").Router()
const db = require("../db.js")
const bcrypt = require('bcrypt');
const path = require("path")

const table = "post"

route.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../",'/public/posts.html'))
})

route.get("/allposts", async(req, res) => {
    db.query(`SELECT * FROM ${table} ORDER BY post_id DESC`, [], (err, data) => {
        if(err) return res.status(500).json({error: true, message: `Error trying to fetch Posts.`})
        else {
            return res.status(200).json({data})
        }
    })
})

route.post("/create", async(req, res) => {
    const {title, category, description, date, admin} = req;
    db.query(`INSERT INTO ${table} (title, category, description, createdAt, admin_id) VALUES (?,?,?,?,?)`, [title, category, description, date, admin], (err) => {
        if(err) return res.status(500).json({error: true, message: `Something went wrong. Could not create post. ${err}`})
        else return res.status(201).json({error: false, message: `New Post has been created Successfully`})
    })
})

route.post("/delete", async(req,res) => {
    const postId = req.body.id 
    db.query(`DELETE FROM ${table} WHERE post_id = ?`, [postId], (err) => {
        if(err) return res.status(500).json({error:true, message: "Something went wrong. Unable to delete post"})
        else return res.status(200).json({error:false, message: "Post was successfully deleted"})
    })
})

module.exports = route