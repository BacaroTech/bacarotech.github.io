+++
title = "SQLLeetCode - 1729 - Find Followers Count"
date = 2026-02-25T14:01:39Z
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
select user_id,count(distinct follower_id) as followers_count 
from Followers 
group by user_id
```

