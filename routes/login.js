const express=require('express')
const router=express.Router()
const db=require('../database')


router.get('/', (req, res) => {
    res.render('pages/login')
})

router.post('/', (req,res)=>{
    
    // has the user entered both email and password?
    if(req.body.email===''||req.body.first_name===''||req.body.surname===''){
        return res.redirect('/login?message=Please%20insert%details')
    }

    //does user exist?
    db.oneOrNone('SELECT * FROM users WHERE email=$1', [req.body.email.toLowerCase()])
    .then((existingUser)=>{
        if(!existingUser){
            return res.redirect('/login?message=Incorrect%20login')
        }

        const email=existingUser.email
        const hash=existingUser.password
        const userId=existingUser.userId

        bcrypt.compare(req.body.password, hash, function(err, result){
            if(result){
               req.session.userId=existingUser.userId
               res.send(req.session)
            } else{
                res.redirect('/login?message=incorrect%20details')
            }
        })

    })
    }


    //does password match user password?

    // if successful, create session and redirect
})

// This form will be sent by POST on the same route. If the login is successful 
// (i.e. if the email address and hashed password match an existing user in the database), the user will be redirected to the site’s home page.

module.exports=router