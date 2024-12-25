import fs from 'fs'
import path from 'path'

const DIR = 'src/app/[locale]/i18n/locales'
const languages = ['en', 'pt']
const outputDir = 'src/app/[locale]/i18n/generated'
const outputFile = 'i18nTypes.ts'

const generateTypes = () => {
  const pages: string[] = []
  const keys: { [key: string]: string[] } = {}

  languages.forEach((lang) => {
    const langDir = path.join(DIR, lang)
    const files = fs.readdirSync(langDir)

    files.forEach((file) => {
      const page = path.basename(file, '.json')
      pages.push(page)

      const filePath = path.join(langDir, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      keys[page] = Object.keys(content)
    })
  })

  const pagesType = `type Pages = ${pages.map((page) => `"${page}"`).join(' | ')};`
  const keysTypes = Object.entries(keys)
    .map(
      ([page, keys]) =>
        `type ${capitalize(page)}Key = ${keys.map((key) => `"${key}"`).join(' | ')};`
    )
    .join('\n')

  const outputContent = `${pagesType}\n\n${keysTypes}`

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(path.join(outputDir, outputFile), outputContent)
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

generateTypes()
