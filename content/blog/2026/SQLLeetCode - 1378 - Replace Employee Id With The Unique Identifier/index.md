+++
title = "SQLLeetCode - 1378 - Replace Employee Id With The Unique Identifier"
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
SELECT euni.unique_id, e.name 
FROM Employees e  
LEFT JOIN EmployeeUNI euni  
ON e.id = euni.id;
```

