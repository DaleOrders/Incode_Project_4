const express = require('express')
const db = require('../database')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('pages/reset', {
        message: req.query.message
    })
})

router.post('/', (req, res) => {
    if (req.body.newpassword === '' || req.body.oldpassword === '' || req.body.confirmpassword === '' || req.body.email === '') {
        return res.redirect('/reset?message=Please%20fill%20in%20all%20fields.')
    }

    else if (req.body.newpassword !== req.body.confirmpassword) {
        return res.redirect('/reset?message=Passwords%20do%20not%match.')
    }

    db.oneOrNone('SELECT * FROM users WHERE email = $1', [req.body.email.toLowerCase()])
        .then((existingUser) => {
            // if not. return error
            if (!existingUser) {
                return res.redirect('/reset?message=No%20current%20user%20with%20that%20email')
            }

            const hash = existingUser.password


            bcrypt.compare(req.body.password, hash, function(err, result) {
                if (result) {
                    db.any('UPDATE users SET password=$1 WHERE email=$2;', [req.body.newpassword, existingUser.password])
                    .then((result)=>{
                        console.log(result)
                        res.redirect('/login')
                    })
                    .catch((err)=>{
                        console.log('error at db')
                    })
                } else {
                    console.log(err)
                    res.redirect('/reset?message=error%20occured')
                }
            })
        })
        .catch((err) => {
            //couldn't query the database properly
            res.send(err.message)
        })
    })



module.exports = router