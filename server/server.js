const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dev = process.env.NODE_DEV !== 'production'; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const category = require('./routes/api/category');
const billing = require('./routes/api/billing');

nextApp.prepare().then(() => {
    const app = express();

// Body parser middleware
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

// DB config
    const db = require('./config/keys').mongoUri;

// Connect to MongoDB
    mongoose.connect(db,{useNewUrlParser: true})
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));

// Passport middleware
    app.use(passport.initialize());

// Passport config
    require('./config/passport')(passport);

    app.use(cors());

    app.use('/myAlfred/api/users',users);
    app.use('/myAlfred/api/category',category);
    app.use('/myAlfred/api/billing',billing);

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server running on port ${port}`));
});

