function signInInfo(collect) {
    collect.preventDefault();

let SiUsername = document.getElementById("SiUsername").value;
let SiPassword = document.getElementById("SiPassword").value;
let SiPasswordC = document.getElementById("SiPasswordC").value;

localStorage.setItem('ls_SiUsername', SiUsername)
localStorage.setItem('ls_SiPassword', SiPassword)
localStorage.setItem('ls_SiPasswordC', SiPasswordC)


}