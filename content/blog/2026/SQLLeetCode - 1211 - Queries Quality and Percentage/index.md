+++
title = "SQLLeetCode - 1211 - Queries Quality and Percentage"
date = 2026-02-25T14:01:31Z
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
    query_name, 
    round(avg(rating/position), 2) quality,
    round(avg(rating < 3)*100, 2) poor_query_percentage
from Queries
where query_name is not null
group by query_name;
```

