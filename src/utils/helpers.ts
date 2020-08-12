export function kFormatter(num) {
  const res =
    Math.abs(num) > 999
      ? Math.abs(num) > 999999
        ? `${Math.sign(num) * Number((Math.abs(num) / 1000000).toFixed(1))}M`
        : `${Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1))}k`
      : toFixed(Math.sign(num) * Math.abs(num), 1);
  return res;
}

export function moneyFormatter(num) {
  return `Rp${Math.round(Number(num)).toLocaleString('id')}`;
}

export function slugToTitle(slug, separator = '-') {
  const words = slug.split(separator);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join('');
}

export function fileTitleCase(string) {
  let words = string.toLowerCase().split(' ');
  for (let i = 0; i < words.length; i++) {
    if (i !== 0) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
  }

  words = words.join('').replace(/\//g, 'Per');
  return words;
}

export function kgToTon(num) {
  const formattedNum = num / 1000;
  return Math.round(formattedNum).toLocaleString('id');
}

export function toFixed(value, precision) {
  const result = value % 1 !== 0 ? value.toFixed(precision) : value;
  return result === '0.0' ? 0 : result;
}
