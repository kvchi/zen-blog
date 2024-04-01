const express = require ('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors({
    origin: "*",
    // credentials: true
}))

app.use(express.json())
app.use(express.static(__dirname + '/public'));

// ROUTE HANDLERS
const authRoute = require("./routes/auth.js")
const postRoute = require("./routes/post.js")

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// Admin Route
app.use("/auth/admin", authRoute)
app.use("/post", postRoute)
app.get('/admin/register', (req, res) => {
    res.redirect('/create-post');
});
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/error.html');
});



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`sever successful, listening on http://localhost:${PORT}`)
})