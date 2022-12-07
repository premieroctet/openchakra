const PATTERN=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
const checkPasswordFormat = pass => PATTERN.test(pass)


const checkPass1 = pass => {
  if (pass === '') {
    return {check: false, error: 'Le mot de passe est vide'}
  }
  else if (checkPasswordFormat(pass)) {
    return {check: true}
  }
  return {
    error: '8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial',
    check: false,
  }
}


const checkPass2 = (pass1, pass2) => {
  if (pass1==pass2) {
    return {check: true}
  }
  return {
    error: 'Les mots de passe saisis sont différents',
    check: false,
  }
}

module.exports = {
  checkPass1,
  checkPass2,
}
