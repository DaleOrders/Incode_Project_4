const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(404).render('pages/404', {
        documentTitle: 'Oops, nothing here...'
    })
})

module.exports = router