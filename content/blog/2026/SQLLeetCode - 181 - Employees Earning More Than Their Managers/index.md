+++
title = "SQLLeetCode - 181 - Employees Earning More Than Their Managers"
date = 2026-02-25T14:01:11Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the employees who earn more than their managers.
> 
> Return the result table in any order.W

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Employee contiene sia le informazioni dei dipendenti che dei manager, distinguendoli tramite il campo managerId, che rappresenta un riferimento all’id di un altro dipendente. Inoltre, non tutti i dipendenti hanno un manager (ad esempio il CEO), quindi in alcuni casi managerId può essere NULL.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
select e1.name as Employee 
from Employee e1
where e1.salary > (
  select e2.salary 
  from Employee e2
  where e2.id = e1.managerId 
)
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)