const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {
  generateJWTAndSetCookie,
} = require("../utils/generateToken");

async function login(req, res) {
  try {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      const { username, password } = req.body;

      const user = await User.findOne({
        username,
      });

      if (!user) {
        res.status(404).json({
          error: "User not found",
        });
        return;
      }

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        res.status(400).json({
          error: "Invalid username or password",
        });
      } else {
        generateJWTAndSetCookie(
          {
            user: user.username,
            _id: user._id,
          },
          res
        );
        res.status(200).json({
          message: "Logged In successfully.",
          user: {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
          },
        });
      }
    } else {
      const errors = validationErrors.array().map((err) => {
        return {
          [err.path]: err.msg,
        };
      });
      res.status(400).json({
        errors,
      });
    }
  } catch (error) {
    console.log(`Error in login: ${error.message}`);
    res.status(500).json({
      error: "Something went wrong, please try again",
    });
  }
}

async function signup(req, res) {
  try {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const { username, password, fullName, gender } =
        req.body;

      let user = await User.findOne({
        username,
      });

      if (user) {
        res.status(409).json({
          error: "User already exists, please login.",
        });
      } else {
        const profilePic =
          gender === "male"
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
          password,
          salt
        );

        user = new User({
          username,
          password: hashedPassword,
          fullName,
          profilePicture: profilePic,
          gender,
        });

        await user.save();

        generateJWTAndSetCookie(
          {
            user: user.username,
            _id: user._id,
          },
          res
        );

        res.status(201).json({
          message: "User created successfully",
          user: {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
          },
        });
      }
    } else {
      const errors = validationErrors.array().map((err) => {
        return {
          [err.path]: err.msg,
        };
      });
      res.status(400).json({
        errors,
      });
    }
  } catch (error) {
    console.log(`Error in signup: ${error.message}`);
    res.status(500).json({
      message: "Something went wrong, please try again",
    });
  }
}

function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out successfully",
  });
}

module.exports = {
  login,
  signup,
  logout,
};
