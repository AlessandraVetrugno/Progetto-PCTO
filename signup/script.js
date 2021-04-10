function verificaCredenziali(){
    let username = document.signup['username'].value;
    let psw = document.signup['password'].value;
    let check = document.signup['check-password'].value;
    if (psw != check) return false;
    return true;
}