const userId = document.getElementById('user-id').value;
const user_delete = document.getElementById('user-delete-btn');
const password = document.getElementById('password');
const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const update_user = document.getElementById("update_user");
const password_error = document.getElementById("password_error");
const lastname_error = document.getElementById("lastname_error");
const firstname_error = document.getElementById("firstname_error");
const email_error = document.getElementById("email_error");

user_delete.addEventListener('click', async (e) => {
    e.preventDefault;

    try {
        if (window.confirm("Are you sure you want to delete your account?")) {
            const res = fetch(`/user/${userId}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
                .then(data => window.location.href = data.redirect)
        }
    }
    catch (error) {
        console.log(error)
    }

});


password.addEventListener('change', async (e) => {
    e.preventDefault;

    if(password.value.length < 6 ) {
        password_error.style.display = "block"; 
    } else {
        password_error.style.display = "none";
    }

    isBlockForm();
});

lastname.addEventListener('change', async (e) => {
    e.preventDefault;

    if(lastname.value.length < 1 ) {
        lastname_error.style.display = "block"; 
    } else {
        lastname_error.style.display = "none";
    }

    isBlockForm();
});

firstname.addEventListener('change', async (e) => {
    e.preventDefault;

    if(firstname.value.length < 1 ) {
        firstname_error.style.display = "block"; 
    } else {
        firstname_error.style.display = "none";
    }

    isBlockForm();
});

email.addEventListener('change', async (e) => {
    e.preventDefault;

    if(!validateEmail(email.value)) {
        email_error.style.display = "block"; 
    } else {
        email_error.style.display = "none";
    }

    isBlockForm();
});

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };


function isBlockForm() {
    if (password_error.style.display == "none" && lastname_error.style.display == "none" && firstname_error.style.display == "none" && email_error.style.display == "none") {
        update_user.disabled = false;
    } else {
        update_user.disabled = true;
    }
}

