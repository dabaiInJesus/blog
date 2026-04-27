<template>
  <div class="projects-page">
    <div class="header">
      <h1>🚀 开源项目</h1>
      <p class="subtitle">欢迎探索我的 GitHub 开源作品</p>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>⚠️ {{ error }}</p>
      <button @click="fetchProjects" class="retry-btn">重试</button>
    </div>

    <div v-else class="projects-grid">
      <a 
        v-for="repo in projects" 
        :key="repo.name" 
        :href="repo.html_url" 
        target="_blank"
        class="project-card"
      >
        <div class="card-header">
          <h2>{{ repo.name }}</h2>
          <div class="stats">
            <span class="star">⭐ {{ repo.stargazers_count }}</span>
            <span class="fork">🍴 {{ repo.forks_count }}</span>
          </div>
        </div>
        
        <p class="description">{{ repo.description || '暂无描述' }}</p>
        
        <div class="card-footer">
          <span class="language" :class="repo.language?.toLowerCase()">
            {{ repo.language || 'Unknown' }}
          </span>
          <span class="topics" v-if="repo.topics?.length">
            <span v-for="topic in repo.topics.slice(0, 3)" :key="topic" class="topic-tag">
              {{ topic }}
            </span>
          </span>
        </div>
      </a>
    </div>

    <div class="github-link">
      <a href="https://github.com/dabaiInJesus" target="_blank">
        👉 查看更多 GitHub 项目
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Repo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
}

const projects = ref<Repo[]>([])
const loading = ref(true)
const error = ref('')

const fetchProjects = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch('https://api.github.com/users/dabaiInJesus/repos?sort=updated&per_page=100', {
      headers: {
        'Accept': 'application/vnd.github+json'
      }
    })
    
    if (!response.ok) {
      throw new Error('获取项目列表失败')
    }
    
    const data = await response.json()
    // 过滤掉 fork 的项目，按 star 数量排序
    projects.value = data
      .filter((repo: Repo) => !repo.fork)
      .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
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

.error {
  text-align: center;
  padding: 2rem;
  background: #fef2f2;
  border-radius: 8px;
  color: #dc2626;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  border: 1px solid #eee;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.card-header h2 {
  font-size: 1.25rem;
  color: #1a1a1a;
  margin: 0;
}

.stats {
  display: flex;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #666;
}

.description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.language {
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
}

.language.python { background: #fef3c7; color: #92400e; }
.language.javascript { background: #fef9c3; color: #854d0e; }
.language.typescript { background: #dbeafe; color: #1e40af; }
.language.vue { background: #d1fae5; color: #065f46; }
.language.java { background: #fee2e2; color: #991b1b; }
.language.shell { background: #e0e7ff; color: #3730a3; }

.topic-tag {
  padding: 0.2rem 0.5rem;
  background: #f3e8ff;
  color: #7c3aed;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: 0.25rem;
}

.github-link {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.github-link a {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s;
}

.github-link a:hover {
  background: #4a5568;
}
</style>
