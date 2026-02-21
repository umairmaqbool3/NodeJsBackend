// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");
const db = require("../utils/database");

const homeDataPath = path.join(rootDir, "data", "homes.json");

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

  save(newHome) {
   return newHome ? db.execute(
      "INSERT INTO homes (houseName, price, location, rating, imageUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
      [this.houseName, this.price, this.location, this.rating, this.imageUrl, this.description]
    ) : db.execute(
      "UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, imageUrl = ?, description = ? WHERE id = ?",
      [this.houseName, this.price, this.location, this.rating, this.imageUrl, this.description, this.id]
    );
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
