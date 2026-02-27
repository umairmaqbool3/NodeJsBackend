const { ObjectId } = require('mongodb');
const {getDB} = require('../utils/database');

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  async save() {
    const db = getDB();
  
    return db.collection('favourites').updateOne(
      { homeId: this.homeId },     // filter (uniqueness condition)
      { $setOnInsert: this },      // only set if inserting
      { upsert: true }             // insert if not exists
    );
  }

  static getFavourites() {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection('favourites').deleteOne({homeId: delHomeId});
  }
};
