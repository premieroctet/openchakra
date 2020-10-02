const ARTICLES = 'le la les un une de des d l à'.split(/ /g);

const normalize = str => {
  const normalized = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return normalized;
};

// Escapes special characters for regex
const escapeText = txt => {
  return txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createRegExp = str => {
  str = escapeText(normalize(str)).split(/ |'/g);
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.join('|'), 'i');
  return regexp;
};

const createRegExpAND = str => {
  str = escapeText(normalize(str)).split(/ |'/g);
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.map(s => `(?=.*\\b${s}\\b)`).join(''), 'i');
  return regexp;
};

const createRegExpOR = str => {
  str = escapeText(normalize(str)).split(/ |'/g);
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s));
  const regexp = new RegExp(str.map(s => `\\b${s}\\b`).join('|'), 'i');
  return regexp;
};

const createQuery = str => {
  const regexp = createRegExp(str);
  const query = {'s_label': {$regex: regexp}};
  return query;
};

const matches = (str, keywords) => {
  const regexps = createRegExp(keywords);
  const ok = regexps.test(str);
  return ok;
};

const formatIban = iban => {
  const result = iban.split('').map((l, idx) => (idx + 1) % 4 == 0 ? l + ' ' : l).join('');
  return result;
};

const maskIban = iban => {
  const len = iban.length;
  const masked = iban.slice(0, 4) + 'X'.repeat(len - 8) + iban.slice(-4);
  return masked;
};

const frenchFormat = str => {
  const reg = /de ([aeiou])/i;
  const result = str.replace(reg, 'd\'$1');
  return result;
};

const normalizePhone = p => {
  if (p) {
    p=p.trim()
    const not_number=/[^\d]/
    while (p.match(not_number)) {
      p = p.replace(not_number, '')
    }
  }
  return p
}

module.exports = {
  normalize,
  createQuery,
  matches,
  formatIban,
  maskIban,
  createRegExp,
  createRegExpOR,
  createRegExpAND,
  frenchFormat,
  normalizePhone
};
