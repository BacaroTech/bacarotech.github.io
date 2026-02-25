+++
title = "SQLLeetCode - 183 - Customers Who Never Order"
date = 2026-02-25T14:01:12Z
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

select c.name as Customers
from Customers c
where c.id not in (
  select o.customerId 
  from Orders o
)
```

