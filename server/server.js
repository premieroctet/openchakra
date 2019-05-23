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
const booking = require('./routes/api/booking');
const calculating = require('./routes/api/calculating');
const equipment= require('./routes/api/equipment');
const favoris = require('./routes/api/favoris');
const filterPresentation = require('./routes/api/filterPresentation');
const job = require('./routes/api/job');
const message = require('./routes/api/message');
const newsletter= require('./routes/api/newsletter');
const searchFilter = require('./routes/api/searchFilter');
const tags= require('./routes/api/tags');
const service = require('./routes/api/service');
const prestation= require('./routes/api/prestation');
const serviceUser = require('./routes/api/serviceUser');
const shop = require('./routes/api/shop');

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
    app.use('/myAlfred/api/booking',booking);
    app.use('/myAlfred/api/calculating',calculating);
    app.use('/myAlfred/api/equipment',equipment);
    app.use('/myAlfred/api/favoris',favoris);
    app.use('/myAlfred/api/filterPresentation',filterPresentation);
    app.use('/myAlfred/api/job',job);
    app.use('/myAlfred/api/message',message);
    app.use('/myAlfred/api/newsletter',newsletter);
    app.use('/myAlfred/api/searchFilter',searchFilter);
    app.use('/myAlfred/api/tags',tags);
    app.use('/myAlfred/api/service',service);
    app.use('/myAlfred/api/prestation',prestation);
    app.use('/myAlfred/api/serviceUser',serviceUser);
    app.use('/myAlfred/api/shop',shop);

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server running on port ${port}`));
});

