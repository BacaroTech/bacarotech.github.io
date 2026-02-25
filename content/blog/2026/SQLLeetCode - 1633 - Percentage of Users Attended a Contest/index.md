+++
title = "SQLLeetCode - 1633 - Percentage of Users Attended a Contest"
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
SELECT 
    contest_id, 
    ROUND(COUNT(DISTINCT user_id) * 100 / (SELECT COUNT(user_id) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id;
```

