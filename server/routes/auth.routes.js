const express = require("express");
const {
  login,
  signup,
  logout,
} = require("../controllers/auth.controller");
const { body } = require("express-validator");
const {
  passwordValidator,
  emptyInputValidator,
  confirmPasswordValidator,
  genderValidator,
} = require("../utils/validators");

const router = express.Router();

router.post(
  "/login",
  [
    body("username")
      .trim()
      .escape()
      .custom((value) => emptyInputValidator(value)),
    body("password")
      .trim()
      .escape()
      .custom((value) => passwordValidator(value)),
  ],
  login
);
router.post(
  "/signup",
  [
    body("username")
      .trim()
      .escape()
      .custom((value) => emptyInputValidator(value)),
    body("password")
      .trim()
      .escape()
      .custom((value) => passwordValidator(value)),
    body("fullName")
      .trim()
      .escape()
      .custom((value) => emptyInputValidator(value)),
    body("confirmPassword")
      .trim()
      .escape()
      .custom((value) => passwordValidator(value))
      .custom((value, { req }) =>
        confirmPasswordValidator(value, req.body.password)
      ),
    body("gender")
      .trim()
      .escape()
      .custom((value) => emptyInputValidator(value))
      .custom((value) => genderValidator(value)),
  ],
  signup
);
router.get("/logout", logout);

module.exports = router;
