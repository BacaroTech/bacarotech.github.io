+++
title = "SQLLeetCode - 619 - Biggest Single Number"
date = 2026-02-25T14:01:20Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> A "single" number is a number that appears exactly once in the MyNumbers table.
>
> Write a solution to find the biggest single number. If there is no single number, the answer is null.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella MyNumbers contiene solo una colonna `num` con vari numeri, alcuni dei quali possono essere ripetuti.

L'obiettivo è trovare il numero più grande che appare esattamente una volta nella tabella (un "single number"). Se non esiste alcun numero che appare una sola volta, dobbiamo restituire null.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) AS single_numbers
```

In questa query:
- La subquery raggruppa i numeri per valore (`GROUP BY num`)
- `HAVING COUNT(*) = 1` filtra solo i numeri che appaiono esattamente una volta
- La query esterna usa `MAX(num)` per ottenere il valore più grande tra i numeri singoli
- Se la subquery non restituisce nessuna riga, MAX() restituirà NULL

Alternativamente, si può usare una versione più compatta:

```sql
SELECT MAX(num) AS num
FROM MyNumbers
GROUP BY num
HAVING COUNT(*) = 1
```

Questo esercizio richiede l'uso di GROUP BY con HAVING per identificare i numeri unici.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)