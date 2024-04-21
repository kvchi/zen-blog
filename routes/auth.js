const route = require("express").Router()
const db = require("../db.js")
const bcrypt = require('bcrypt');
const path = require("path")


const table = 'admin'

// const route = express.route()

// GET
route.get("/register", (req, res) => {
    console.log(`Path is `, path.join(__dirname, "../",'/public/admin-register.html'))
    res.sendFile(path.join(__dirname, "../",'/public/admin-register.html'));
})

// POST
route.post('/register', async (req, res) => {

    try {
        const { username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const lowerUsername = username.toLowerCase()

        db.query(`SELECT id FROM ${table} WHERE username = ?`, [lowerUsername], (err, data) => {
            if(err) return res.status(500).json({error: true, message: `Error trying to find the user.`})
            if(data.length) return res.status(403).json({error: true, message: `This username already exist, please try another`})
            else {
                db.query(`INSERT INTO ${table} (username, password) VALUES (?,?)`, [lowerUsername, hashedPassword], (err, data) => {
                    // if(err) res.status(500).json({error: true, message: `Something went wrong, we could not process your registration. ${err}`}) //Include the ${err} to see the cause ONLY in development
                    if(err) return res.status(500).json({error: true, message: `Error after inserting into the table.`});
                    // res.redirect('/create-post');
                    return res.status(201).json({error: false, message: `Welcome to NathanBlog ${username}`, data});

                    
                });
            }
        });

    } catch (error) {
        console.error(error);
        console.log(res.json())
        return res.status(500).json({error: true, message: `Something went wrong, we could not process your registration`});
    }
});

// POST
route.post('/login', async (req, res) => {

    try {
        const { username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const lowerUsername = username.toLowerCase()

        db.query(`SELECT id FROM ${table} WHERE username = ?`, [lowerUsername], (err, data) => {
            if(err) return res.status(500).json({error: true, message: `Error trying to find the user.`})
            if(data.length) return res.status(403).json({error: true, message: `This username already exist, please try another`})
            else {
                db.query(`INSERT INTO ${table} (username, password) VALUES (?,?)`, [lowerUsername, hashedPassword], (err, data) => {
                    // if(err) res.status(500).json({error: true, message: `Something went wrong, we could not process your registration. ${err}`}) //Include the ${err} to see the cause ONLY in development
                    if(err) return res.status(500).json({error: true, message: `Error after inserting into the table.`});
                    // res.redirect('/create-post');
                    return res.status(201).json({error: false, message: `Welcome to NathanBlog ${username}`, data});

                    
                });
            }
        });

    } catch (error) {
        console.error(error);
        console.log(res.json())
        return res.status(500).json({error: true, message: `Something went wrong, we could not process your registration`});
    }
});


module.exports = route