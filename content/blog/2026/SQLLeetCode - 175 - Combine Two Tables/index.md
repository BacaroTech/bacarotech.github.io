+++
title = "SQLLeetCode - 175 - Combine Two Tables"
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
select p.firstName, p.lastName, a.city, a.state
from Person p left join Address a on p.personId = a.personId
order by p.firstname

```

