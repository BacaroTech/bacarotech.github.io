+++
title = "SQLLeetCode - 1280 - Students And Examinations"
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
    S.student_id
    ,S.student_name
    ,SU.subject_name
    ,COUNT(E.student_id) attended_exams
FROM Students S
CROSS JOIN Subjects SU
LEFT JOIN Examinations E
    ON S.student_id = E.student_id
    AND SU.subject_name = E.subject_name

GROUP BY S.student_id, S.student_name, SU.subject_name
ORDER BY S.student_id, S.student_name, SU.subject_name;
```

