+++
title = "SQLLeetCode - 584 - Find Customer RefereeFind Customer Referee"
date = 2026-02-25T14:01:17Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Find the names of the customer that are either:
> 
> - referred by any customer with id != 2.
> - not referred by any customer.
> 
> Return the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Customer contiene anche il campo referee_id, che indica quale cliente ha fatto da referente (referrer) per un altro cliente. Tuttavia, questo campo può essere NULL nel caso in cui il cliente non abbia alcun referente.

L’obiettivo è quindi trovare tutti i clienti che:

- non sono stati referenziati dal cliente con id = 2
- oppure non hanno alcun referente

Per questo motivo filtriamo:

- i record con referee_id IS NULL
- oppure quelli con referee_id != 2

Detto ciò, la soluzione che proponiamo noi è la seguente:
```sql
select c.name
from Customer c
where c.referee_id is null or c.referee_id != 2
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)