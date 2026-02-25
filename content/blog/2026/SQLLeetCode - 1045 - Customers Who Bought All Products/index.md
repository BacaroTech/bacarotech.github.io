+++
title = "SQLLeetCode - 1045 - Customers Who Bought All Products"
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
select customer_id
from Customer
group by customer_id
having count(distinct product_key) = (select count(product_key) from Product);
```

