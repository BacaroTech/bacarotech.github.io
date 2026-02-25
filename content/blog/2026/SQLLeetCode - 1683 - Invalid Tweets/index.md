+++
title = "SQLLeetCode - 1683 - Invalid Tweets"
date = 2026-02-25T14:01:38Z
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
SELECT tweet_id
FROM Tweets
WHERE LENGTH(content) - LENGTH(REPLACE(content, ' ', '')) + 1 > 2;
```

