+++
title = "SQLLeetCode - 1148 - Article Views I"
date = 2026-02-25T14:01:27Z
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
select distinct author_id as id from Views
where author_id = viewer_id 
order by id;
```

