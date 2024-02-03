const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const { dir } = require('console');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect to DB
    
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// middleware method-override
app.use(methodOverride('_method')) 

//XMLHttpRequest, fetch, axios

//HTTP Logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs', //rename file handlebars --> hbs
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('views engine', 'hbs');
app.set('views', './src/resources/views');

//route init

route(app);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
