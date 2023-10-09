const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
  get: (username, callback) => {
    db.hgetall(username, (err, user) => {

      if (!user) {
        const err = new Error('User not found');
        return callback(err, null);
      }
      user.username = username;
      callback(null, user);
    });
    // TODO create this method
  }
}
