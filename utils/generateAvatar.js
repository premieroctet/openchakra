const GENERATE_AVATAR = alfred => {
  let prenom = alfred.firstname.charAt(0);
  let nom = alfred.name.charAt(0);
  return prenom+nom;
};

module.exports = {GENERATE_AVATAR};
