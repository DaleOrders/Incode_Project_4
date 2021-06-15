const express=require('express')
const router=express.Router()
const db=require('../database')


router.get('/', (req, res) => {
    res.render('pages/login')
})

router.post('/', (req,res)=>{
    //redirect to where?
})


module.exports=router