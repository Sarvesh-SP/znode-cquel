const bcrypt = require('bcrypt');

// Hash password
const passwordGen = async (user) => {
  if (user.changed('password')) {
    // eslint-disable-next-line no-param-reassign
    user.password = await bcrypt.hash(user.password, 10);
  }
};

// Compare the user logged in password with the db user password
async function validatePassword(loginPassword, hashedPassword) {
  return bcrypt.compare(loginPassword, hashedPassword);
}

module.exports = {
  passwordGen,
  validatePassword,
};
