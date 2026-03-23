+++
title = "SQLLeetCode - 197 - Rising Temperature"
date = 2026-02-25T14:01:13Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find all dates' id with higher temperatures compared to its previous dates (yesterday).
> 
> Return the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Weather contiene le registrazioni giornaliere della temperatura, dove ogni riga è identificata da una data (recordDate) e da un id univoco.

L’obiettivo è quindi confrontare la temperatura di un giorno con quella del giorno precedente, per trovare i casi in cui la temperatura è aumentata.

Per farlo, utilizziamo una sottoquery che recupera la temperatura del giorno prima sfruttando la funzione DATEDIFF, che calcola la differenza in giorni tra due date.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
select w1.id as Id
from Weather w1
where w1.temperature > (
    select w2.temperature
    from Weather w2
    where DATEDIFF(w1.recordDate , w2.recordDate ) = 1
)
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)