const checkSocialSecurity = ss => {
  if (!ss || ss.length != 15 || isNaN(parseInt(ss))) {
    return '15 chiffres attendus (13+clé)';
  }

  const number = parseInt(ss.substring(0, 13));
  const key = parseInt(ss.substring(13, 15));

  const remaining = number % 97;
  if (97 - remaining != key) {
    return 'Numéro incorrect';
  }
  return null;
};


module.exports = {
  checkSocialSecurity,
};
