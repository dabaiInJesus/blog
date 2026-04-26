---
title: Vue3 组合式 API 实战笔记
date: 2026-04-26
---

# Vue3 组合式 API 实战笔记

组合式 API（Composition API）是 Vue3 的核心特性，以下是实战中的一些心得。

## 为什么用组合式 API？

1. **更好的逻辑复用** - 比 Mixins 更清晰
2. **更灵活的代码组织** - 相关逻辑放在一起
3. **更好的类型推导** - 配合 TypeScript 使用

## 基础示例

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式状态
const count = ref(0)
const doubled = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('组件挂载完成')
})
</script>
```

## 实用技巧

### 1. 抽取逻辑到 composables

```javascript
// useCounter.js
export function useCounter() {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubled, increment }
}
```

### 2. 响应式解构

使用 `toRefs` 保持解构后的响应性：

```javascript
import { toRefs } from 'vue'

const { count, name } = toRefs(props)
```

## 总结

组合式 API 让代码更容易维护和测试，推荐在新项目中优先使用。

---

*更多 Vue3 实战笔记持续更新中...*
