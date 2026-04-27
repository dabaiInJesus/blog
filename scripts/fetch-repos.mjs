import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = join(__dirname, '..', 'src', 'public', 'repos.json')

const GITHUB_USER = 'dabaiInJesus'
const API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`

const headers = { 'Accept': 'application/vnd.github.v3+json' }

// 如果有 GITHUB_TOKEN 环境变量，使用它来提高 API 频率限制
if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function main() {
  console.log('Fetching repos from GitHub API...')
  const res = await fetch(API, { headers })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub API responded with ${res.status}: ${text}`)
  }

  const repos = await res.json()
  const data = repos
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map(r => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      topics: r.topics || []
    }))

  writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')
  console.log(`Saved ${data.length} repos to public/repos.json`)
}

main().catch(err => {
  console.error('Failed to fetch repos:', err.message)
  process.exit(1)
})
