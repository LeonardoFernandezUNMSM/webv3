const mongoose = require('mongoose');
const app = require("./app");
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION,
} = require("./constants");

const port = process.env.PORT || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (error) => {
        if(error) throw error;

        app.listen(port, () => {
            console.log("API REST - a");
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);

        });
    }
);