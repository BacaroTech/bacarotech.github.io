+++
title = "SQLLeetCode - 577 - Employee Bonus"
date = 2026-02-25T14:01:16Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the name and bonus amount of each employee who satisfies either of the following:
>
> - The employee has a bonus less than 1000.
> - The employee did not get any bonus.
>
> Return the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Employee contiene tutti i dipendenti, mentre la tabella Bonus associa eventualmente un bonus a ciascun dipendente tramite empId. Tuttavia, non tutti i dipendenti hanno necessariamente un bonus assegnato.

L’obiettivo è quindi selezionare:

i dipendenti che non hanno bonus (NULL)
oppure quelli che hanno un bonus inferiore a 1000

Per questo motivo utilizziamo una LEFT JOIN, così da includere anche i dipendenti senza bonus, e poi filtriamo con la condizione nel WHERE.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
select e.name, b.bonus
from Employee e left join Bonus b on e.empId = b.empId
where b.bonus is null or b.bonus < 1000
```

