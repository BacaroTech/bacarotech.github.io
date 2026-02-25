+++
title = "SQLLeetCode - 1068 - Product Sales Analysis I"
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
SELECT p.product_name, s.year, s.price  
FROM Sales s  
JOIN Product p  
ON s.product_id = p.product_id;
```

