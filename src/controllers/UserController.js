import db from '../connection.js';

const getUsers = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {};

export default { getUsers, getUserById };
