+++
title = "SQLLeetCode - 1164 - Product Price at a Given Date"
date = 2026-02-25T14:01:28Z
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
select distinct product_id, 10 as price
from  products
group by product_id
having min(change_date) > "2019-08-16"
union
select product_id, new_price
from Products 
where (product_id, change_date) in  ( select product_id, max(change_date) as recent_date
                                    from Products
                                    where change_date <= "2019-08-16"
                                    group by product_id )
```

