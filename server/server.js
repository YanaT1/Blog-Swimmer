require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandingMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, 
            'https://www.ivantryputen.com']
}));
app.use(express.static(path.resolve(__dirname, 'client', 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();