const checkPasswordFormat = pass => (pass.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
const arePasswordsEquals = (pass1, pass2) => (pass1 === pass2)


const checkPass1 = pass => {
    if (pass === "") {
        return {check: false}
    } else if (checkPasswordFormat(pass)) {
        return {check: true}
    }
    return {
        error: "8 caractères minimum dont une majuscule, une minuscule et un chiffre",
        check: false
    }
}


const checkPass2 = (pass1, pass2) => {
    if (pass2 === "") {return {check: false}}

    else if (arePasswordsEquals(pass1, pass2)) {return {check: true}}

    return {
        error: "Les mots de passe saisis sont différents",
        check: false
    }
}

module.exports = {
    checkPass1,
    checkPass2
}