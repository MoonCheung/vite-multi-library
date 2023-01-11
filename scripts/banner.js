import pkg from '../package.json';

const date = new Date();
const formatter = new Intl.DateTimeFormat('zh', {
  day: 'numeric',
  year: 'numeric',
  month: 'long'
});
const releaseDate = formatter.format(date);

module.exports = (name = null) =>
  `${`
/**
 * Img-Uploader ${name ? `${name} ` : ''}${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 * Copyright 2023-${date.getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 * Released on: ${releaseDate}
 */
`.trim()}\n`;
