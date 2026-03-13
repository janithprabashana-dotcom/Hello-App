const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
    secret: 'your-secret-key-here',
    resave: false,
    saveUninitialized: true
}));

// ---------- Routes ----------

// 1. Form page (GET)
app.get('/', (req, res) => {
    res.render('index');   // Your existing styled form
});

// 2. Handle form submission (POST) and redirect to greeting
app.post('/greet', (req, res) => {
    const name = req.body.name;
    req.session.userName = name;
    res.redirect('/hello');
});

// 3. Greeting page (GET)
app.get('/hello', (req, res) => {
    const name = req.session.userName || 'Guest';
    res.render('hello', { name });   // Your existing styled greeting
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});