const mongoose = require("mongoose");

const config = require("../assets/config.json");

const { username, password } = config.Mongodb;

// const url1 = `mongodb+srv://${username}:${password}@cluster0.oilxr.mongodb.net/PMT?retryWrites=true&w=majority`;

const url = `mongodb+srv://${username}:${password}@cluster0.n6n9yzr.mongodb.net/no_name_for_now?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function dbConnection() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(url, (err) => {
        if (err) {
          reject(`Failed to open a MongoDB Database connection, ${err}`);
        }
        resolve("MongoDB connected");
      });
    } catch (error) {
      reject(`Failed to open a MongoDB Database connection, ${error}`);
    }
  });
}

module.exports = dbConnection;
