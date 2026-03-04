const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Welcome To Airbnb",
    currentPage: "Login",
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ""}
  });
};

exports.postLogin = async (req, res, next) => {
  // res.cookie("isLoggedIn", "true");
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) {
    return res.status(401).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist."],
      oldInput: {email}
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    return res.status(401).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid password."],
      oldInput: {email}
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.cookie("isLoggedIn", "false");
  // res.clearCookie("isLoggedIn");
  req.session.destroy(err => {
    res.redirect("/login");
  });
};

exports.getRegister = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors:[],
    oldInput: {firstName: "", lastName: "", email: "", password: "", userType: ""}
  });
};

exports.postRegister = [
  check("firstName")
    .trim()
    .isLength({min: 2})
    .withMessage("First Name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name should contain only alphabets"),
  
    check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last Name should contain only alphabets"),
  
    check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  
    check("password")
    .isLength({min: 8})
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),
  
    check("confirmPassword")
    .trim()
    .custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  
    check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(['guest', 'host'])
    .withMessage("Invalid user type"),
  
    check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value, {req}) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const {firstName, lastName, email, password, userType} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {firstName, lastName, email, password, userType}
      });
    }
    
    bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({firstName, lastName, email, password: hashedPassword, userType});
        return user.save();
      }).then(() => {
        res.redirect("/login");
      })
      .catch(err => {
        console.log("Error saving user to database: ", err);
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {firstName, lastName, email, password, userType}
        });
      });
  }
];

