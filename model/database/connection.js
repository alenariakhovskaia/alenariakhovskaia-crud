const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection 
        const con = await mongoose.connect("mongodb+srv://alenariakhovskaia:PerXpD8PRblcgMgR@cluster0.ajpbio2.mongodb.net/alenariakhovskaia?retryWrites=true&w=majority", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            autoIndex: true 
        })

        console.log('Connected to the Database!...')
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDB
