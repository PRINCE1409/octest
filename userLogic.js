const { sign } = require("jsonwebtoken");
const User = require("../models/userModel");

async function createSendTokenLogic(user) {
  return new Promise(async (resolve, reject) => {
    const token = await sign({ email: user.email.toString() }, "hello", {
      expiresIn: "2h",
    });
    if (!token) {
      reject({
        status: "fail",
        code: 401,
        message: "Token not created",
      });
    }
    const user1 = {
      email: user.email,
      password: user.password
    }
    resolve({ token, user1 });
  });
}

async function loginLogic(email, password) {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      reject({
        status: "fail",
        code: 401,
        message: "Please provide email and password",
      });
    }
      
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await bcrypt.compare(password, user.password))) {
        reject({
          status: "fail",
          code: 401,
          message: "Incorrect email or password",
        });
      } 
        resolve({ user });
    
  });
}

module.exports = {
  createSendTokenLogic,
  //   createUserLogic,
  loginLogic,
  //   updatePasswordLogic,
  //   allUsersLogic,
  //   userByIdLogic,
  //   getUserProjectLogic,
};
