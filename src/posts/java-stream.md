---
title: Java 8 Stream 常用操作总结
date: 2026-04-26
---

# Java 8 Stream 常用操作总结

Stream API 是 Java 8 最重要的特性之一。

## 常用操作

### 过滤 (filter)

```java
list.stream().filter(item -> item.isActive()).collect(Collectors.toList());
```

### 映射 (map)

```java
list.stream().map(Item::getName).collect(Collectors.toList());
```

### 排序 (sorted)

```java
list.stream().sorted(Comparator.comparing(Item::getOrder)).collect(Collectors.toList());
```

---

*更多内容整理中...*