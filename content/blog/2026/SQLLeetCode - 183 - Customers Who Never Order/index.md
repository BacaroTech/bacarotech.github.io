+++
title = "SQLLeetCode - 183 - Customers Who Never Order"
date = 2026-02-25T14:01:12Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find all customers who never order anything.
> 
> WReturn the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Customers contiene tutti i clienti, mentre la tabella Orders tiene traccia degli ordini effettuati e collega ogni ordine a un cliente tramite il campo customerId.

Di conseguenza, per trovare i clienti che non hanno mai effettuato ordini, è sufficiente selezionare quelli il cui id non compare tra i customerId presenti nella tabella Orders.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
select c.name as Customers
from Customers c
where c.id not in (
  select o.customerId 
  from Orders o
)
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)