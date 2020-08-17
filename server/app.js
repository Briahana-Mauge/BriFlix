
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');

let signInRouter = require('./routes/signin');
let showsRouter = require('./routes/shows');
let usersRouter = require('./routes/users');
let commentsRouter = require('./routes/comments');
let genresRouter = require('./routes/genres');

let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', signInRouter);
app.use('/shows', showsRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/genres', genresRouter);

module.exports = app;
