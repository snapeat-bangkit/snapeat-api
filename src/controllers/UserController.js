import db from '../connection.js';

const getUsers = (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getUserByName = (req, res) => {
    const userName = req.params.username;
    db.query('SELECT * FROM user WHERE username = ?', [userName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
};

export default { getUsers, getUserByName };
