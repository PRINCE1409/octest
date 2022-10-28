const jwt = require('jsonwebtoken');
const SECRET_KEY = 'no_name_for_now';


const checkToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log(token)
        const verify = jwt.verify(token, SECRET_KEY);
        console.log(verify)
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

module.exports = checkToken;