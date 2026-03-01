const mongoose = require('mongoose')

function RunServer(){
    try {
        mongoose.connect(process.env.MONGO_DB_URL)
        console.log('✅ MongoDB Connected Successfully!!')
    } catch (error) {
        console.log('❌ MongoDB Connection Failed')
    }
}

module.exports = RunServer;