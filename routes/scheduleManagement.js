const express = require('express')
const db = require('../database')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

//form to add new schedule

router.get('/', (req,res) => {
    db.any(`SELECT user_id, day, TO_CHAR(start_at,\'fmHH12:MI AM\') as start_at, TO_CHAR(end_at,\'fmHH12:MI AM\') as end_at FROM schedules WHERE user_id = $1;`, [req.session.userId])
            .then((result) => {
                res.render('pages/scheduleManagement', {
                    result: result
            })
            })
        .catch((err) => {
            console.log(err.message)
            res.send(err)
        })
})

router.post('/', (req,res)=>{
    if(req.session.userId){
        db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);', [req.session.userId, req.body.day, req.body.start_at, req.body.end_at])
            .then(()=>{
                res.redirect('/scheduleManagement')
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
})



module.exports = router