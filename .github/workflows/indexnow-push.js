import fetch from 'node-fetch'

const sitemapUrls = ['https://journeypeng.best/sitemap-index.xml']

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
