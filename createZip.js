const fs = require('fs')
const cp = require('child_process')

require('dotenv').config()

let manifestFile = fs.readFileSync('manifest/manifest.json').toString()
const placeHolders = {
	appName: process.env.APP_NAME,
	appId: process.env.CLIENT_ID,
	shortUrl: process.env.APP_URL?.split('://')[1]
}

Object.entries(placeHolders).forEach(([placeholder, value]) => {
	const placeHolderWithBrackets = `{{ ${placeholder} }}`
	while (manifestFile.includes(placeHolderWithBrackets)) {
		manifestFile = manifestFile.replace(placeHolderWithBrackets, value)
	}
})

fs.mkdirSync('temp')

fs.copyFileSync('manifest/color.png', 'temp/color.png')
fs.copyFileSync('manifest/outline.png', 'temp/outline.png')
fs.writeFileSync('temp/manifest.json', manifestFile, { encoding: 'utf-8' })

try {
	fs.rmSync('app.zip')
} catch {}

cp.spawnSync('powershell', ['Compress-Archive temp/* app.zip'])
fs.rmSync('temp', { recursive: true, force: true })
