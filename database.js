const mongoose = require("mongoose");

const connectDB = () => {
    
  mongoose
    .connect(
     process.env.MONGODBURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then((e) => console.log("connected"))
    .catch((e) => console.log(e));
};

module.exports = connectDB;