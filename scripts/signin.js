const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    Validate();
});

const sendData = (emailVal, passwordVal, sRate, Count) => {
    if (sRate === Count) {
        //  to store the form data
        const userData = {
            email: emailVal,
            password: passwordVal
            
        };
        // Store  user data in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        swal("You are Registered", "success");
    }
};

const SuccessMsg = (emailVal, passwordVal) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for (var i = 0; i < formContr.length; i++) {
        if (formContr[i].className === "form-control success") {
            var sRate = 0 + i;
            console.log(sRate);
            sendData(emailVal, passwordVal, sRate, Count);
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
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    // email
    if (emailVal === "") {
        setErrorMsg(email, 'email cannot be blank');
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, 'email is not valid');
    } else {
        setSuccessMsg(email);
    }

    // password
    if (passwordVal === "") {
        setErrorMsg(password, 'password cannot be blank');
    } else if (passwordVal.length <= 7) {
        setErrorMsg(password, 'min 8 char');
    } else {
        setSuccessMsg(password);
    }

    SuccessMsg(emailVal, passwordVal);
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
