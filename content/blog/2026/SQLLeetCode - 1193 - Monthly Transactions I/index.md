+++
title = "SQLLeetCode - 1193 - Monthly Transactions I"
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
select substring(trans_date,1,7) as month,
        country,
        count(state) as trans_count,
        sum(state='approved') as approved_count,
        sum(amount) as trans_total_amount,
        sum(if(state='approved',amount,0)) as approved_total_amount
from Transactions
group by month,country;

```

