+++
title = "SQLLeetCode - 197 - Rising Temperature"
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
select w1.id as Id
from Weather w1
where w1.temperature > (
    select w2.temperature
    from Weather w2
    where DATEDIFF(w1.recordDate , w2.recordDate ) = 1
)
```

