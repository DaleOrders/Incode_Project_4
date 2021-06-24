const express = require('express')
const db = require('../database')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req,res) => {
    db.any('SELECT user_id, surname, first_name, day, TO_CHAR(start_at,\'fmHH12:MI AM\') as start_at, TO_CHAR(end_at,\'fmHH12:MI AM\') as end_at FROM users INNER JOIN schedules ON users.id=schedules.user_id')
        .then((result => {
            res.render('pages/homepage',{
                result: result,
            })
        }))
        .catch((err => {
            console.log(err.message)
        }))
    
})


module.exports = router
