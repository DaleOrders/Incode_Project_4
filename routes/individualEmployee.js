//page to show individual employee schedules
const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/:id(\\d+)', (req,res)=>{
    db.any('SELECT first_name, surname, email, day, TO_CHAR(start_at,\'fmHH12:MI AM\') as start_at, TO_CHAR(end_at,\'fmHH12:MI AM\') as end_at FROM users INNER JOIN schedules ON users.id=schedules.user_id WHERE users.id=$1;',[req.params.id])
    .then((result)=>{
        console.log(result)
        res.render('pages/employeePage',{
            result: result,
            documentTitle: "Employee Page"
        })
    })
    .catch((err)=>{
        console.log(err.message)
    })
})

module.exports = router