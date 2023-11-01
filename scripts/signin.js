const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    Validate();
});

const sendData = (usernameVal, emailVal, passwordVal, sRate, Count) => {
    if (sRate === Count) {
        // Create an object to store the form data, including the password
        const userData = {
            username: usernameVal,
            email: emailVal,
            password: passwordVal
            
        };
        // Store  user data in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        alert({
            title: "Success",
            text: "Hello " + usernameVal + ", you are registered!",
            icon: "success",
            button: "Go to Home",
        }).then(() => {
            // Redirect to the home page or replace the URL with your actual home page URL
            window.location.href = "index.html";
        });
    }
};

const SuccessMsg = (usernameVal, emailVal, passwordVal) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for (var i = 0; i < formContr.length; i++) {
        if (formContr[i].className === "form-control success") {
            var sRate = 0 + i;s
            console.log(sRate);
            sendData(usernameVal, emailVal, passwordVal, sRate, Count);
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
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    // username
    if (usernameVal === "") {
        setErrorMsg(username, 'Username cannot be blank');
    } else {
        setSuccessMsg(username);
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
        setErrorMsg(password, 'Your Password has at least one capital letter, one lowercase letter, and a number');
    } else {
        setSuccessMsg(password);
    }

    SuccessMsg(usernameVal, emailVal, passwordVal);
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


document.getElementById("form").onsubmit = function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Perform form validation and submission logic here
    // For simplicity, let's assume the form is always valid

    // Display a success message
    // alert( usernameVal +"Form submitted successfully!");
    let userName = document.getElementById('username').value;
    alert ("Hi "+ userName + ", welcome back to Instastream")
    localStorage.setItem("username", userName);
    // Redirect to the home page (replace 'home.html' with your actual home page URL)
    window.location.href = "/index.html";
};