const generate_avatar = alfred => {
  if (alfred == null || typeof alfred == 'undefined' || typeof alfred.name == 'undefined') {
    return '';
  }
  let prenom = alfred.firstname.charAt(0);
  let nom = alfred.name.charAt(0);
  return prenom + nom;
};

module.exports = {generate_avatar};
