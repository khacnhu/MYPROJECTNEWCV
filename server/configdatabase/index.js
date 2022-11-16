const mongoose = require('mongoose');

async function  connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/PROJECTREDUX', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,        
        });
        console.log("Connect Succesfully")
    } catch (error) {
        console.log("Connect Failure")
    }

}

module.exports = {connect};