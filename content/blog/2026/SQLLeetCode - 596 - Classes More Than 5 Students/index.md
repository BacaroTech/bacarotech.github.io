+++
title = "SQLLeetCode - 596 - Classes More Than 5 Students"
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
select class
from (
  select c1.class, count(*) as countMember
  from Courses c1
  group by c1.class
) groupCourses 
where countMember >= 5
```

