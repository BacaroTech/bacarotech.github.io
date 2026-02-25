+++
title = "SQLLeetCode - 181 - Employees Earning More Than Their Managers"
date = 2026-02-25T14:01:11Z
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
select e1.name as Employee 
from Employee e1
where e1.salary > (
  select e2.salary 
  from Employee e2
  where e2.id = e1.managerId 
)
```

