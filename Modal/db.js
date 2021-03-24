const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URI}`,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Application connected to the database");
    }
  }
);
