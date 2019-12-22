function hasNumber(myString) {
  return /\d/.test(myString);
};

emailValidator = (req, res, next) => {
  let email = req.body.Email;
  let username = email.substring(0, email.indexOf("@"));
  let provider = email.substring(email.indexOf("@") + 1, email.lastIndexOf("."));
  let domain = email.substring(email.lastIndexOf(".") + 1);
  if (provider === "" || hasNumber(provider)) {
    var error = new Error("Check your provider")
    error.status = 422;
    next(error);
  } else if (domain.length !== 3 || hasNumber(domain)) {
    var error = new Error("Check your domain")
    error.status = 422;
    next(error);
  } else if (username === "" || username.length < 5) {
    var error = new Error("Check your username");
    error.status = 422;
    next(error);
  };
  next();
};
         
isAdult = (req, res, next) => {                 
  let age = req.body.Age;
  if (age < 18) {
    var error = new Error("You must be 18 or older!");
    error.status = 416;
    next(error)
  };
  next();
};

productValidator = (req, res, next) => {
  let description = req.body.Description;
  let price = req.body.Current_Price;
  if (description.length < 7) {
    var error = new Error("Product Description must be more than 7 Letters!");
    error.status = 416;
    next(error);
  } else if (parseFloat(price) < 1) {
    var error = new Error("Price cannot be lower than 1$");
    error.status = 422;
    next(error);
  }
  next();
}

passwordValidator = (req, res, next) => {
  let pass = req.body.Password;
  if (pass.length < 5) {
    var error = new Error("Password  must be longer than 5 characters");
    error.status = 403;
    next(error);
  }
  next();
}

userNameValidator = (req, res, next) => {
  let username = req.body.Username;
  if (username.length < 5) {
    var error = new Error("Username  must be longer than 5 characters");
    error.status = 403;
    next(error);
  }
  next();
}



module.exports = {
  emailValidator, isAdult, productValidator, passwordValidator, userNameValidator
};