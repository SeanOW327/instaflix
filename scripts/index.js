const form = document.getElementById('form');
const username = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    Validate();
});

const sendData = (usernameVal, lastnameVal, emailVal, passwordVal, sRate, Count) => {
    if (sRate === Count) {
        
        const userData = {
            username: usernameVal,
            lastname: lastnameVal,
            email: emailVal,
            password: passwordVal
           
        };
       
        localStorage.setItem('userData', JSON.stringify(userData));

      
    }
};

const SuccessMsg = (usernameVal, lastnameVal, emailVal, passwordVal) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for (var i = 0; i < formContr.length; i++) {
        if (formContr[i].className === "form-control success") {
            var sRate = 0 + i;
            console.log(sRate);
            sendData(usernameVal, lastnameVal, emailVal, passwordVal, sRate, Count);
        } else {
            return false;
        }
    }
};

const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf('@');
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}

function Validate() {
    const usernameVal = username.value.trim();
    const lastnameVal = lastname.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();

    // username
    if (usernameVal === "") {
        setErrorMsg(username, 'First name cannot be blank');
    } else if (usernameVal.length <= 2) {
        setErrorMsg(username, 'Username must have a minimum of 3 characters');
    } else {
        setSuccessMsg(username);
    }

    // last name
    if (lastnameVal === "") {
        setErrorMsg(lastname, 'Last name cannot be blank');
    } else if (lastnameVal.length <= 2) {
        setErrorMsg(lastname, 'Last must have a minimum of 3 characters');
    } else {
        setSuccessMsg(lastname);
    }

    // email
    if (emailVal === "") {
        setErrorMsg(email, 'Email cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'This email is not valid');
    } else {
        setSuccessMsg(email);
    }

    // password
    if (passwordVal === "") {
        setErrorMsg(password, 'Password cannot be blank');
    } else if (passwordVal.length <= 7) {
        setErrorMsg(password, 'Password must have a minimum of 8 characters');
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(passwordVal)) {
        setErrorMsg(password, 'Include at least one capital letter, one lowercase letter, and a number');
    } else {
        setSuccessMsg(password);
    }

    // confirm password
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, 'Confirm password cannot be blank');
    } else if (passwordVal != cpasswordVal) {
        setErrorMsg(cpassword, 'Your Passwords do not match!');
    } else {
        setSuccessMsg(cpassword);
    }
    SuccessMsg(usernameVal, lastnameVal, emailVal, passwordVal);
}

function setErrorMsg(input, errormsgs) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-control error";
    small.innerText = errormsgs;
}

function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// ALERT TO REDIRECT
// document.getElementById("form").onsubmit = function (e) {
//     e.preventDefault(); 

//        alert ("Hi "+document.getElementById('username').value + ", You are now registered, welcome to Instastream")
//     // Redirect to the home page (replace 'home.html' with your actual home page URL)
//     window.location.href = "/index.html";
// };