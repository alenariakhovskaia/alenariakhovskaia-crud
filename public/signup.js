const form = document.getElementById('signup-form')
const emailError = document.querySelector('.email.error')
const firstnameError = document.querySelector('.firstname.error')
const lastnameError = document.querySelector('.lastname.error')
const passwordError = document.querySelector('.password.error')
const loader2 = document.querySelector('.display-loader__two')

form.addEventListener('submit', async (e)=> {
    e.preventDefault();
    loader2.style.display = 'block'

    // reset All error fields
    emailError.textContent = ''
    firstnameError.textContent = ''
    lastnameError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value
    const firstname = form.firstname.value
    const lastname = form.lastname.value
    const password = form.password.value

    try{
        const result = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({email, firstname, lastname, password}),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await result.json();

        if (data.refinedError) {
            loader2.style.display = 'none'
            emailError.textContent = data.refinedError.email
            firstnameError.textContent = data.refinedError.firstname
            lastnameError.textContent = data.refinedError.lastname
            passwordError.textContent = data.refinedError.password
        }

        if (data.user) {
            loader2.style.display = 'none'
            location.assign('/create')
        }
    }
    catch(err) {
        console.log(err)
    }
})


