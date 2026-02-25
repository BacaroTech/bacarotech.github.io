+++
title = "SQLLeetCode - 1757 - Recyclable and Low Fat Products"
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
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y'
```

