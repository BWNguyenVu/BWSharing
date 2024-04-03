const mongoose = require('mongoose');

async function connect(){
    try {
    await mongoose.connect(process.env.MONGO_DB,{});
    console.log('Connect Successfully!!!');
    }catch(error){
        console.log('Connect Failure!!!');
    }
}

module.exports = {connect};