const express = require('express')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req,res) => {
    res.render('pages/homepage')
})

module.exports = router