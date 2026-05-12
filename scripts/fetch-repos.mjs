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

// ===== 置顶项目列表 =====
// 在此处添加需要优先展示的项目名称（区分大小写）。
// 置顶项目会在项目页排在前面，并带有 📌 标记。
// 示例:
//   const PINNED = ['offline-ocr', 'bible-typing']
const PINNED = [
  // 'your-project-name'
]

async function main() {
  console.log('Fetching repos from GitHub API...')
  const res = await fetch(API, { headers })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GitHub API responded with ${res.status}: ${text}`)
  }

  const repos = await res.json()
  const filtered = repos
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

  // 聚合统计
  const totalRepos = filtered.length
  const totalStars = filtered.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks = filtered.reduce((s, r) => s + r.forks_count, 0)

  // 提取所有语言（去重、排序）
  const languageSet = new Set(filtered.map(r => r.language).filter(Boolean))
  const languages = Array.from(languageSet).sort()

  // 排序：置顶项目优先，其余按 star 数降序
  const sorted = [
    ...filtered.filter(r => PINNED.includes(r.name)),
    ...filtered.filter(r => !PINNED.includes(r.name))
  ]

  // 输出结构:
  //   stats: { total_repos, total_stars, total_forks, languages }
  //   pinned: string[] — 置顶的项目名列表
  //   repos: 项目对象数组，按 置顶>star数 排序
  const output = {
    stats: {
      total_repos: totalRepos,
      total_stars: totalStars,
      total_forks: totalForks,
      languages
    },
    pinned: PINNED,
    repos: sorted
  }

  writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`Saved ${totalRepos} repos to public/repos.json`)
  console.log(`  Stars: ${totalStars}  Forks: ${totalForks}  Languages: ${languages.join(', ')}`)
  if (PINNED.length > 0) {
    console.log(`  Pinned: ${PINNED.join(', ')}`)
  }
}

main().catch(err => {
  console.error('Failed to fetch repos:', err.message)
  process.exit(1)
})
