+++
title = "SQLLeetCode - 620 - Not Boring Movies"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

## sol1.sql

```sql
SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC;
```

