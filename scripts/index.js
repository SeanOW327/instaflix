function signInInfo(collect) {
    collect.preventDefault();

let SiUsername = document.getElementById("SiUsername").value;
let SiPassword = document.getElementById("SiPassword").value;
let SiPasswordC = document.getElementById("SiPasswordC").value;

localStorage.setItem('ls_SiUsername', SiUsername)
localStorage.setItem('ls_SiPassword', SiPassword)
localStorage.setItem('ls_SiPasswordC', SiPasswordC);


}




function myFunction() {
    // Get the value of the input field with id "SiPassword"
    let x = document.getElementById("SiPassword").value;

    // Password validation: Requires at least one number, one uppercase letter, and one lowercase letter.
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    let text;

    if (!regex.test(x)) {
        text = "Password must have at least one number, one uppercase letter, and one lowercase letter.";
    } else {
        text = "Password Valid";



    }
    if (!password.match(passwordRegex)) {
        document.getElementById("message").textContent = "Password must have at least one number, one uppercase letter, and one lowercase letter, with a minimum length of 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("message").textContent = "Passwords do not match.";
        return;
    }


    document.getElementById("demo").innerHTML = text;
  }


// function signInInfo(event) {
//     event.preventDefault();

//     let username = document.getElementById("SiUsername").value;
//     let password = document.getElementById("SiPassword").value;

//     // Password validation: Requires at least one number, one uppercase letter, and one lowercase letter.
//     let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

//     if (!password.match(passwordRegex)) {
//         document.getElementById("message").textContent = "Password must have at least one number, one uppercase letter, and one lowercase letter.";
//         return;
//     }

   
// }




   

    // // Password validation: Requires at least one number, one uppercase letter, and one lowercase letter.
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // if (!password.match(passwordRegex)) {
    //     document.getElementById("message").textContent = "Password must have at least one number, one uppercase letter, and one lowercase letter, with a minimum length of 6 characters.";
    //     return;
    // }

    // // Check if the username and password exist in local storage
    // const storedPassword = localStorage.getItem(username);

    // if (password === storedPassword) {
    //     document.getElementById("message").textContent = "Sign in successful!";
    //     // Redirect or perform further actions here.
    // } else {
    //     document.getElementById("message").textContent = "Invalid username or password.";
    // }
