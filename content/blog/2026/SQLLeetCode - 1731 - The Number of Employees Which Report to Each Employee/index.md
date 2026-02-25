+++
title = "SQLLeetCode - 1731 - The Number of Employees Which Report to Each Employee"
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
select e.employee_id, e.name, sub.reports_count, sub.average_age
from (
    select reports_to,
    count(reports_to) as reports_count,
    round(avg(age)) as average_age
    from Employees
    group by reports_to
    having count(reports_to)>=1
) as sub
left join
Employees as e
on sub.reports_to=e.employee_id
order by e.employee_id asc
```

