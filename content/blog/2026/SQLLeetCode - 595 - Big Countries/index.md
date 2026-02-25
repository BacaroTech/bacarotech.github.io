+++
title = "SQLLeetCode - 595 - Big Countries"
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
select w1.name, w1.population, w1.area
from World w1
where w1.area >= 3000000 or w1.population >= 25000000
```

