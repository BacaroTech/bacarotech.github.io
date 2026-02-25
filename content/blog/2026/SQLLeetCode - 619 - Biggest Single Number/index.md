+++
title = "SQLLeetCode - 619 - Biggest Single Number"
date = 2026-02-25T14:01:20Z
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
select 
    max(num) as num 
from (
    select num
    from mynumbers
    group by num
    having count(num) = 1) as a;
```

