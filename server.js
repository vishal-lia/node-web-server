const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

let port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) throw err;
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to my Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log('Server started');
});