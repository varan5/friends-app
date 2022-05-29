const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};
