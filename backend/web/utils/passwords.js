const crypto=require('crypto')

const PATTERN=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
const PATTERN_STR='8 caractères minimum dont une majuscule, une minuscule, un chiffre et un caractère spécial'
const checkPasswordFormat = pass => PATTERN.test(pass)


const checkPass1 = pass => {
  if (pass === '') {
    return {check: false, error: 'Le mot de passe est vide'}
  }
  else if (checkPasswordFormat(pass)) {
    return {check: true}
  }
  return {
    error: PATTERN_STR,
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

const validatePassword = ({password, password2}) => {
  if (!PATTERN.test(password)) {
    return Promise.reject(`Mot de passe incorrect:${PATTERN_STR}`)
  }
  if (password!=password2) {
    return Promise.reject(`Les mots de passe saisis ne correspondent pas`)
  }
  return Promise.resolve()
}

const generatePassword = () => {
  const length=8
  const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  return Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('')
}

module.exports = {
  checkPass1,
  checkPass2,
  validatePassword,
  generatePassword,
}
