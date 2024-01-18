const {MongoClient} = require('mongodb');
url = process.env.MONGO_URL;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const client = new MongoClient(url, mongoOptions);
module.exports = client