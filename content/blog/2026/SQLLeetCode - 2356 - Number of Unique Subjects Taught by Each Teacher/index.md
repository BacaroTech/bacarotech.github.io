+++
title = "SQLLeetCode - 2356 - Number of Unique Subjects Taught by Each Teacher"
date = 2026-02-25T14:01:43Z
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
select teacher_id, count(distinct(subject_id)) as cnt 
from Teacher 
group by teacher_id
```

