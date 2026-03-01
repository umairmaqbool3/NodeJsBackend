
const mongoose = require('mongoose');
const favourite = require('./favourite');

const homeSchema = new mongoose.Schema({
  houseName: {type: String, required: true},
  price: {type:Number,required: true},
  location: {type: String, required:true},
  rating: {type:Number,required: true},
  imageUrl: String,
  description: String
});

homeSchema.pre('findOneAndDelete', async function(next) {
  console.log("inside prehook of home to delete related favourites");
  const homeId = this.getQuery()['_id'];
  await favourite.deleteMany({ homeId: homeId });
  // next();
});
 
module.exports = mongoose.model('Home', homeSchema);


