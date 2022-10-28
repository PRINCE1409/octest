const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const validator = require('validator');
const createToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log('isValidEmail', validator.isEmail(email))

    if (firstName.length < 3 || lastName.length < 3 || !validator.isEmail(email) || password.length < 5) {
      return res.status(400).json({ message: 'please check the details you added' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword })

    if (!newUser) {
      return res.status(404).json({ message: 'user not created' })

    }

    return res.status(201).json({ data: newUser, message: 'user created successfully' });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email) || password.length < 5) {
      return res.status(400).json({ message: 'please check the details you added' });
    }

    const existingUser = await User.findOne({ email }).select("password email firstName lastName");

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!existingUser || !matchPassword) {
      return res.status(404).json({ message: 'invalid credentials' })
    }

    const data = { email: existingUser.email, _id: existingUser._id, firstName: existingUser.firstName, lastName: existingUser.lastName };

    const token = createToken(email, existingUser._id);
    // console.log(token);

    return res.status(200).json({ data: data, token });

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }

}

// for test purpose 
exports.secret = async (req, res) => {
  res.send('accessible')
}