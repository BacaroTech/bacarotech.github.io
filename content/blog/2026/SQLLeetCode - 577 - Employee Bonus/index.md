+++
title = "SQLLeetCode - 577 - Employee Bonus"
date = 2026-02-25T14:01:16Z
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
select e.name, b.bonus
from Employee e left join Bonus b on e.empId = b.empId
where b.bonus is null or b.bonus < 1000
```

