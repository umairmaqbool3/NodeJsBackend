
const {getDB} = require("../utils/database");

module.exports = class Home {
  constructor(houseName, price, location, rating, imageUrl,description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.description = description;
    this.id = id;
  }

  save() {
   const db = getDB();
   return db.collection("homes").insertOne(this);
  }

  static fetchAll() {
   return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
