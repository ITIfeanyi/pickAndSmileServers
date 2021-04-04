const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://pickandsmile:ECI3F0sY9yWgmi47@cluster0.ecyvm.mongodb.net/pickAndSmile?retryWrites=true&w=majority`,
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
