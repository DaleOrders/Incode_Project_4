const firstname=document.getElementById(first_name)
const surname=document.getElementById(surname)
const email=document.getElementById(email)
const password=document.getElementById(password)


const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
const validateName=/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i
const validatePassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

const emailValidation=validateEmail.test(email)
const validateFirstname=validateName.test(first_name)
const validateSurname=validateName.test(surname)
const validatePassword=validatePassword.test(password)

if(!emailValidation||!validateFirstname||!validateSurname||!validatePassword){
    console.log('Incorrect entry')
}
