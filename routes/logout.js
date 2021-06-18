const express = require('express')
const router = express.Router()
const{ redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req, res) => {
    console.log(req.session)
    req.session.destroy(function(err) {
        if (err) {
            console.log(err)
            res.send(err.message)
        } else {
            res.clearCookie('mrcoffee_sid')
            res.redirect('/login')
        }
    })
    console.log(req.session)
})

module.exports = router