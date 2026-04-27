<script setup>
import { ref, onMounted } from 'vue'

const repos = ref([])
const loading = ref(true)
const error = ref('')

const fetchRepos = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('/repos.json')
    if (!res.ok) throw new Error(`获取失败 (${res.status})`)
    repos.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const languageColors = {
  Python: { bg: '#fef3c7', color: '#92400e' },
  JavaScript: { bg: '#fef9c3', color: '#854d0e' },
  TypeScript: { bg: '#dbeafe', color: '#1e40af' },
  Vue: { bg: '#d1fae5', color: '#065f46' },
  Java: { bg: '#fee2e2', color: '#991b1b' },
  Shell: { bg: '#e0e7ff', color: '#3730a3' },
  Go: { bg: '#d1fae5', color: '#065f46' },
  Rust: { bg: '#fee2e2', color: '#991b1b' }
}

const getLangStyle = (lang) => {
  return languageColors[lang] || { bg: '#f3f4f6', color: '#666' }
}

const formatNum = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

onMounted(fetchRepos)
</script>

<template>
  <div class="projects-page">
    <div class="hero">
      <div class="hero-icon">🚀</div>
      <h1>开源项目</h1>
      <p class="hero-subtitle">代码即态度，欢迎 Star 和 Fork</p>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>⚠️ {{ error }}</p>
      <button @click="fetchRepos" class="retry-btn">重试</button>
    </div>

    <div v-else class="projects-grid">
      <a
        v-for="repo in repos"
        :key="repo.name"
        :href="repo.html_url"
        target="_blank"
        class="project-card"
      >
        <div class="card-top">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </div>
          <div class="card-stats">
            <span class="stat">
              <span class="stat-icon">⭐</span>
              {{ formatNum(repo.stargazers_count) }}
            </span>
            <span class="stat">
              <span class="stat-icon">🍴</span>
              {{ formatNum(repo.forks_count) }}
            </span>
          </div>
        </div>

        <h3 class="card-title">{{ repo.name }}</h3>
        <p class="card-desc">{{ repo.description || '暂无描述' }}</p>

        <div class="card-bottom">
          <span
            class="language-tag"
            :style="{ background: getLangStyle(repo.language).bg, color: getLangStyle(repo.language).color }"
          >
            {{ repo.language || 'Other' }}
          </span>
        </div>
      </a>
    </div>

    <div class="github-link">
      <a href="https://github.com/dabaiInJesus" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        GitHub 主页
      </a>
    </div>
  </div>
</template>

<style scoped>
.projects-page {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 0;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 4rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
  border-color: transparent;
}

.project-card:hover::before {
  transform: scaleX(1);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  color: white;
}

.card-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.stat-icon {
  font-size: 0.9rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: #1f2937;
}

.card-desc {
  flex: 1;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  margin-top: auto;
}

.language-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.github-link {
  text-align: center;
  margin-top: 3rem;
}

.github-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.github-link a:hover {
  background: #4a5568;
  transform: scale(1.05);
}

.error {
  text-align: center;
  padding: 3rem;
  background: #fef2f2;
  border-radius: 16px;
  color: #dc2626;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #5a6fd6;
}
</style>

<style>
.VPDoc:has(._projects) .content-container {
  max-width: 90%;
}
</style>
