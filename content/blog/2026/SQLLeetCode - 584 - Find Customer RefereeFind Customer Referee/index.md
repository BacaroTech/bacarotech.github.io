+++
title = "SQLLeetCode - 584 - Find Customer RefereeFind Customer Referee"
date = 2026-02-25T14:01:17Z
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
select c.name
from Customer c
where c.referee_id is null or c.referee_id != 2
```

