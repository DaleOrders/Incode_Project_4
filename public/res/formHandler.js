/* function validInfo () {
    document.addEventListener("DOMContentLoaded", () => {
        const email=document.getElementById(email)
        const password=document.getElementById(password)

        form.onsubmit = (e) => {
            e.preventDefault()
            const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
            const validatePassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{5,32}$/

            const emailValidation=validateEmail.test(email)
            const validatePassword=validatePassword.test(password)

            if(!emailValidation || !validatePassword){
                return false
            }
        }
    })
} */