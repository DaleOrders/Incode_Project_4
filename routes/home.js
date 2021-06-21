const express = require('express')
const db = require('../database')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

router.get('/', redirectToLogin, (req,res) => {
    db.any('SELECT surname, first_name, day, TO_CHAR(start_at,\'fmHH12:MI AM\') as start_at, TO_CHAR(end_at,\'fmHH12:MI AM\') as end_at FROM users INNER JOIN schedules ON users.id=schedules.user_id')
        .then((result=>{
            console.log(result)
            res.render('pages/homepage',{
                result:result
            })
        }))
        .catch((err=>{
            console.log(err.message)
        }))
    
})


module.exports = router
//to_char(start_at,\'fmHH12:MI AM\') as start_at

// Create the home page that displays all existing schedules.

// You can already implement a logout button in the navigation bar. This button will lead to a route that will delete the session data and redirect to the login page.


// Make sure that the user session remains active, even if the user closes the browser window, as long as they haven’t clicked on the logout button. 

// We invite you to follow the article provided in the appendices to help you set up your logic.