const jwt = require('jsonwebtoken');
const SECRET_KEY = 'no_name_for_now';

const createToken = (email, id) => {
    const token = jwt.sign({ email, id }, SECRET_KEY, { expiresIn: '1000' });
    return token;
}

module.exports = createToken;