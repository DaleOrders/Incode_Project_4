//link to show employee's schedules

const express = require('express')
const db = require('../database')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req,res)=>{
    db.any('SELECT first_name, surname, email, day, TO_CHAR(start_at,\'fmHH12:MI AM\') as start_at, TO_CHAR(end_at,\'fmHH12:MI AM\') as end_at FROM users INNER JOIN schedules ON users.id=schedules.user_id WHERE users.id=$1;',[req.session.userId])
    .then((result)=>{
        console.log(result)
        res.render('pages/employeePage',{
            result: result,
            documentTitle: "Employee Page",
            message: req.query.message
        })
    })
    .catch((err)=>{
        res.redirect('/employeePage?message=No%20schedules%20to%20show.')
    })
})

module.exports = router

// <!-- The user name associated with the schedule will be a link to a user page that displays the user's information
//  (first name, last name, email address) and their schedules.