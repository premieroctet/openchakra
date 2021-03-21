const stripBom = require('strip-bom')

const ARTICLES = 'le la les un une de des d l à'.split(/ /g);
const SIREN_LENGTH=9
const SIRET_LENGTH=14

const normalize = str => {
  if (str) {
    const normalized = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return normalized;
  }
  return str
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
  const reg = /de ([éèêàaeiou])/i;
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

const bufferToString = buff => {
  var text = buff.toString('utf-8')
  // For MAC files
  text = stripBom(text)
  return text
}

const ILLEGAL_REGEX = /(O|0|\+33)[O\d \.,-]+\d|\S+@\S+|@\S+/

const hideIllegal = text => {
  if (text) {
    while (text.match(ILLEGAL_REGEX)) {
      text = text.replace(ILLEGAL_REGEX, '[Masqué]')
    }
  }
  return text
}

const formatAddress = addr => {
  if (!addr) {
    return null
  }
  return `${addr.address}, ${addr.city} ${addr.zip_code}`
}

const compact = string => {
  const result = string.replace(/ /g, '')
  return result
}

const to_siren = siretOrSiret => {
  siretOrSiret = compact(siretOrSiret)
  if (siretOrSiret.length==SIREN_LENGTH) {
    return siretOrSiret
  }
  if (siretOrSiret.length==SIRET_LENGTH) {
    return siretOrSiret.slice(0, 9)
  }
  return ''
}

const compute_vat_number = siren => {
  if (!siren) {
    return ''
  }
  const siren_formatted = to_siren(siren)
  const siren_compact = compact(siren_formatted.toString())
  if (siren_compact.length!=9) {
    return ''
  }
  const siren_int = parseInt(siren_compact+'12')
  if (isNaN(siren_int)) {
    return ''
  }
  const siren_modulo = siren_int%97
  const result = `FR${siren_modulo.toString().padStart(2, '0')}${siren_compact}`
  return result
}

const isSiretSirenLength = value => {
  if (!value) {
    return false
  }
  value=parseInt(compact(value))
  if (isNaN(value)) {
    return false
  }
  const lengthOk =[SIRET_LENGTH, SIREN_LENGTH].includes(value.toString().length)
  return lengthOk
}

const insensitiveComparator = (a,b) => {
  a = normalize(a ||'')
  b = normalize(b ||'')
  return a<b ? -1 : a>b ? 1 : 0
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
  normalizePhone,
  bufferToString,
  hideIllegal,
  formatAddress,
  compact,
  compute_vat_number,
  isSiretSirenLength,
  insensitiveComparator,
};
