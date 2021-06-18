const express = require('express')
const db = require('../database')
const router = express.Router()
//const{ redirectToLogin } = require('../middleware')

//form to add new schedule

router.get('/', (req,res)=>{
    res.render('pages/scheduleManagement')
})

router.post('/', (req,res)=>{
    if(req.session.id){
        db.none('INSERT INTO schedules(user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4);', [req.session.id, req.body.day, req.body.start_at, req.body.end_at])
        .then((result)=>{
            console.log(result)
            res.render('/home')
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
})



module.exports = router