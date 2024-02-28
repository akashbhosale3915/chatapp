function passwordValidator(value) {
  if (!value) {
    throw new Error("Password field cannot be empty");
  }
  if (value.length < 6) {
    throw new Error(
      "Password should be at least 6 characters"
    );
  }
  return true;
}

function emptyInputValidator(value) {
  if (!value) {
    throw new Error("Field cannot be empty");
  }
  return true;
}
function genderValidator(value) {
  if (value !== "male" && value !== "female") {
    throw new Error("Gender should be male or female");
  }
  return true;
}
function confirmPasswordValidator(
  comparePassword,
  password
) {
  if (password !== comparePassword) {
    throw new Error("Passwords do not match");
  }
  return true;
}

module.exports = {
  passwordValidator,
  emptyInputValidator,
  confirmPasswordValidator,
  genderValidator,
};
