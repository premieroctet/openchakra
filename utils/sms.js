
class RegExpParam extends RegExp {

  constructor(reg, repl) {
    super(reg);
    this.repl=repl;
  }

  [Symbol.replace](str) {
    return RegExp.prototype[Symbol.replace].call(this, str, this.repl);
  }
}

const fillSms = (pattern, values) => {
  const r=RegExp("{{\\s*params.([^\\s]+)\\s*}}");
  while (found=r.exec(pattern)) {
    const param=found[1];
    if (values[param]==undefined) {
      console.error(`Missing param ${param}`);
      return null;
    }
    pattern=pattern.replace(new RegExpParam(`{{\\s*params.${param}\\s*}}`, values[param]));
  }
  return pattern;
}

const isPhoneOk = value => {
  if (!value) return false;
  if (value.length==10 && value.startsWith('0')) return true;
  if (value.length==11 && value.startsWith('33')) return true;
  return false;
}

module.exports={fillSms, isPhoneOk}
