+++
title = "SQLLeetCode - 1934 - Confirmation Rate"
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
SELECT A.user_id, ROUND(IFNULL(AVG(action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups AS A
LEFT JOIN Confirmations AS B ON A.user_id = B.user_id
GROUP BY A.user_id;
```

