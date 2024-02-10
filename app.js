const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

// ROUTE HANDLERS
const authRoute = require("./routes/auth.js")

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
// Admin Route
app.use("/auth/admin", authRoute)
// app.get('/admin/register', (req, res) => {
//     res.sendFile(__dirname + '/public/admin-register.html');
// });
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/error.html');
});



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`sever successful, listening on http://localhost:${PORT}`)
})