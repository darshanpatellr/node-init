const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log("User Router Time: " + Date.now());
    next();
});

// http://localhost:8080/users
router.get('/', (req, res) => {
    res.send('User Home Page');
});

// http://localhost:8080/users/123
router.get('/:id', (req, res) => {
    res.send('User Profile ID: ' + req.params.id);
})

module.exports = router;