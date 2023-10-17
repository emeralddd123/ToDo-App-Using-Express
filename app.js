const express = require('express');
const morgan = require('morgan')


const port = process.env.PORT || 3000;
const path = require('path');

const connnectToDb = require('./dbConnection')

const app = express();
connnectToDb()


morgan.token('host', function (req, res) {
    return req.hostname;
});
const webRouter = require('./web/webRoutes');
const apiRouter = require('./api/apiRoutes');

app.use(morgan(':method :host :status :res[content-length] - :response-time ms'))

app.use(express.json()) // body parser: json
app.use(express.urlencoded({ extended: true })); // body prser: formdata

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter);
app.use('/', webRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
