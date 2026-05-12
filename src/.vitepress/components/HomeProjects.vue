<script setup>
import { ref, computed, onMounted } from 'vue'

const data = ref(null)
const loading = ref(true)

const fetchData = async () => {
  try {
    const res = await fetch('/repos.json')
    if (!res.ok) throw new Error(`获取失败 (${res.status})`)
    data.value = await res.json()
  } catch {
    // silently fail — homepage shouldn't break
  } finally {
    loading.value = false
  }
}

const featured = computed(() => {
  if (!data.value) return []
  return data.value.repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4)
})

const languageColors = {
  Python: { bg: '#fef3c7', color: '#92400e' },
  JavaScript: { bg: '#fef9c3', color: '#854d0e' },
  TypeScript: { bg: '#dbeafe', color: '#1e40af' },
  Vue: { bg: '#d1fae5', color: '#065f46' },
  Java: { bg: '#fee2e2', color: '#991b1b' },
  Shell: { bg: '#e0e7ff', color: '#3730a3' },
  Go: { bg: '#d1fae5', color: '#065f46' },
  Rust: { bg: '#fee2e2', color: '#991b1b' },
  HTML: { bg: '#fef3c7', color: '#b45309' }
}

const getLangStyle = (lang) => {
  return languageColors[lang] || { bg: '#f3f4f6', color: '#666' }
}

const formatNum = (num) => {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

onMounted(fetchData)
</script>

<template>
  <div v-if="!loading && data" class="home-projects">
    <!-- Stats strip -->
    <div class="stats-strip">
      <div class="strip-item">
        <span class="strip-num">{{ data.repos.length }}</span>
        <span class="strip-label">开源项目</span>
      </div>
      <div class="strip-dot"></div>
      <div class="strip-item">
        <span class="strip-num">{{ formatNum(data.stats.total_stars) }}</span>
        <span class="strip-label">Star</span>
      </div>
      <div class="strip-dot"></div>
      <div class="strip-item">
        <span class="strip-num">{{ data.stats.languages.length }}</span>
        <span class="strip-label">技术栈</span>
      </div>
    </div>

    <!-- Featured projects -->
    <h2 class="section-title">⭐ 精选项目</h2>
    <div class="featured-grid">
      <a
        v-for="repo in featured"
        :key="repo.name"
        :href="repo.html_url"
        target="_blank"
        class="feat-card"
      >
        <div class="feat-top">
          <span class="feat-name">{{ repo.name }}</span>
          <span class="feat-stars">⭐ {{ formatNum(repo.stargazers_count) }}</span>
        </div>
        <p class="feat-desc">{{ repo.description || '暂无描述' }}</p>
        <div class="feat-bottom">
          <span
            class="lang-tag"
            :style="{ background: getLangStyle(repo.language).bg, color: getLangStyle(repo.language).color }"
          >
            {{ repo.language || 'Other' }}
          </span>
        </div>
      </a>
    </div>

    <!-- CTA -->
    <div class="cta-row">
      <a href="/projects" class="cta-link">查看全部项目 →</a>
    </div>
  </div>
</template>

<style scoped>
.home-projects {
  max-width: 1152px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* ─── Stats strip ─── */

.stats-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
  color: white;
}

.strip-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.strip-num {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
}

.strip-label {
  font-size: 0.85rem;
  opacity: 0.85;
}

.strip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
}

/* ─── Section title ─── */

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1.5rem;
  text-align: center;
}

/* ─── Featured grid ─── */

.featured-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
}

.feat-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e5e7eb;
  transition: all 0.25s ease;
}

.feat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(102, 126, 234, 0.12);
  border-color: #667eea;
}

.feat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.feat-name {
  font-weight: 600;
  font-size: 1rem;
  color: #1f2937;
}

.feat-stars {
  font-size: 0.85rem;
  color: #6b7280;
  white-space: nowrap;
}

.feat-desc {
  flex: 1;
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feat-bottom {
  margin-top: auto;
}

.lang-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* ─── CTA ─── */

.cta-row {
  text-align: center;
  margin-top: 2rem;
}

.cta-link {
  display: inline-block;
  padding: 0.7rem 2rem;
  color: #667eea;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 9999px;
  border: 1.5px solid #667eea;
  transition: all 0.25s ease;
}

.cta-link:hover {
  background: #667eea;
  color: white;
}
</style>
