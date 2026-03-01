const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Airbnb Home",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn
    });
  })
};

exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn
    })
  })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('homeId') // Populate the homeId field with the corresponding Home document
  .then(favourites => {
    const favouriteHomes = favourites.map(fav => fav.homeId);// here fave.homeId is the populated Home document
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn
    })
  })
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({ homeId: homeId }).then(existingFav => {
    if (existingFav) {
      console.log("Already in Favourite");
      res.redirect("/favourites");
    } else {
      const favourite = new Favourite({ homeId });
      favourite.save().then(result => {
        console.log("Added to Favourite : ", result);
        res.redirect("/favourites");
      }).catch(error => {
        console.log("Error while adding to Favourite", error);
        res.redirect("/favourites");
      });
    }
  }).catch(error => {
    console.log("Error while checking existing Favourite", error);
    res.redirect("/favourites");
  });
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({homeId}).then(result => {
    console.log("Removed from Favourite : ", result);
  }).catch(error => {
    console.log("Error while removing from Favourite", error);
  }).finally(() => {
    res.redirect("/favourites");
  });
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn
      });
    }
  })
};

