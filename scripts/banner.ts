// @ts-ignore
import fs from 'fs-extra'

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)))
const date = new Date()
const formatter = new Intl.DateTimeFormat('zh', {
  day: 'numeric',
  year: 'numeric',
  month: 'long'
})
const releaseDate = formatter.format(date)

export default (name: string | unknown = null) =>
  `${`
/**
 * Img-Uploader ${name ? `${name} ` : ''}${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 * Copyright 2023-${date.getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 * Released on: ${releaseDate}
 */
`.trim()}\n`
