
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Welcome To Airbnb",
    currentPage: "Login",
    isLoggedIn: false
  });
};

exports.postLogin = (req, res, next) => {
  // res.cookie("isLoggedIn", "true");
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", "false");
  // res.clearCookie("isLoggedIn");
  req.session.destroy(err => {
    res.redirect("/login");
  });
};
