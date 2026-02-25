+++
title = "SQLLeetCode - 1141 - User Activity for the Past 30 Days I"
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
# Write your MySQL query statement below
select activity_date as "day", count(*) as active_users 
from (
    select distinct user_id, activity_date
    from Activity 
) as aux
where activity_date > "2019-06-27" AND activity_date <= "2019-07-27"
group by activity_date
```

