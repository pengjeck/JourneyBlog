import fetch from 'node-fetch'

const apiKeyFileUrl = "https://www.journeypeng.best/4dc4c9c693e344bc9f80c78e5fa5a42c.txt"
const sitemapUrls = ['https://journeypeng.best/sitemap-index.xml',
	'https://journeypeng.best/sitemap-0.xml']

fetch(apiKeyFileUrl)
	.then((response) => response.text())
	.then((apiKey) => {
		apiKey = apiKey.trim()
		sitemapUrls.forEach((sitemapUrl) => {
			const url = `https://www.bing.com/indexnow?url=${encodeURIComponent(
				sitemapUrl
			)}&key=${apiKey}`

			fetch(url)
				.then((response) => response.text())
				.then((data) => console.log(`Pushed ${sitemapUrl}:`, data))
				.catch((error) => console.error('Error:', error))
		})
	})
	.catch((error) => console.error('Error fetching API key:', error))
