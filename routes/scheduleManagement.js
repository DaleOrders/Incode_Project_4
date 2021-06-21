const express = require('express')
const db = require('../database')
const router = express.Router()
const { redirectToLogin } = require('../middleware')

//form to add new schedule

router.get('/', (req,res) => {
        db.any('SELECT * FROM schedules;') 
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
    let new_user = req.session.id
    if(req.session.id){
        db.any(`INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);`, [req.session.id, req.body.day, req.body.start_at, req.body.end_at])
            .then(()=>{
                res.redirect('pages/scheduleManagement')
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
})



module.exports = router