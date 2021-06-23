//page to show individual employee schedules
const express = require('express')
const db = require('../database')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('pages/individualEmployee',{
        title:result
    })
})

router.post('/', (req,res)=>{
    res.render('pages/individualEmployee',{
        result:result
    })
})

module.exports = router