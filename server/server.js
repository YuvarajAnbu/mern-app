if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");

    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`${err} || did not connect`);
  });
