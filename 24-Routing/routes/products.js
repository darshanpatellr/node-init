const express = require('express');
const router = express.Router();

// http://localhost:8080/products
router.get('/', (req, res) => {
    res.send('Product List');
});

// http://localhost:8080/products/abc
router.get('/:id', (req, res) => {
    res.send('Product Details for : ' + req.params.id);
});

module.exports = router;