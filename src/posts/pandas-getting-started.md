---
title: Pandas 入门指南
date: 2026-04-26
---

# Pandas 入门指南

Pandas 是 Python 最流行的数据分析库。

## 基础操作

### 读取数据

```python
import pandas as pd
df = pd.read_csv('data.csv')
```

### 查看数据

```python
df.head()
df.describe()
df.info()
```

### 数据筛选

```python
df[df['column'] > 100]
```

---

*更多内容整理中...*