const mongoose = require("mongoose")
require('dotenv').config()

const MONGO_DB_URL = process.env.MONGO_DB_URL

function connnectToDb() {
    mongoose.connect(MONGO_DB_URL)

    mongoose.connection.on("connected", () => {
        console.log(`Mongo Db Database Connected Succesfully`)
    })

    mongoose.connection.on("error", (err) => {
        console.log(`Error connecting to the database`)
        console.log(`${err}`)
    })
}

module.exports = connnectToDb 
