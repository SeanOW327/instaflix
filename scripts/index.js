function signInInfo(collect) {
    collect.preventDefault();

let SiUsername = document.getElementById("SiUsername").value;
let SiPassword = document.getElementById("SiPassword").value;
let SiPasswordC = document.getElementById("SiPasswordC").value;

// localStorage.setItem('ls_SiUsername', SiUsername)
// localStorage.setItem('ls_SiPassword', SiPassword)
// localStorage.setItem('ls_SiPasswordC', SiPasswordC)


// }

function signInInfo(event) {
    event.preventDefault();

    let username = document.getElementById("SiUsername").value;
    let password = document.getElementById("SiPassword").value;

    // Password validation: Requires at least one number, one uppercase letter, and one lowercase letter.
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!password.match(passwordRegex)) {
        document.getElementById("message").textContent = "Password must have at least one number, one uppercase letter, and one lowercase letter.";
        return;
    }

   
}