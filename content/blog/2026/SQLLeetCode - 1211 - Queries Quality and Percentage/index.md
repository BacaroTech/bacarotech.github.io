+++
title = "SQLLeetCode - 1211 - Queries Quality and Percentage"
date = 2026-02-25T14:01:31Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> We define query quality as:
>
>    The average of the ratio between query rating and its position.
>
>We also define poor query percentage as:
>
>    The percentage of all queries with rating less than 3.
>
>Write a solution to find each query_name, the quality and poor_query_percentage.
>
>Both quality and poor_query_percentage should be rounded to 2 decimal places.
>
>Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Queries contiene le informazioni sulle query: `query_name`, `position`, `rating`, `timestamp`.

L'obiettivo è calcolare due metriche per ogni query_name:
1. **Quality**: la media di (rating / position) per ogni query, arrotondata a 2 decimali
2. **poor_query_percentage**: la percentuale di query con rating < 3, arrotondata a 2 decimali

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT 
    query_name, 
    ROUND(AVG(rating / position), 2) AS quality,
    ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name
```

In questa query:
- `AVG(rating / position)` calcola la qualità media per ogni query_name
- Per la percentuale di query scadenti, usiamo un'espressione condizionale: `CASE WHEN rating < 3 THEN 1 ELSE 0 END` che restituisce 1 se il rating è inferiore a 3, altrimenti 0
- La media di questa espressione dà la frazione di query scadenti, moltiplicata per 100 per ottenere la percentuale
- `WHERE query_name IS NOT NULL` esclude le righe senza nome di query
- `GROUP BY query_name` raggruppa i risultati per nome della query

Questo esercizio richiede l'uso di funzioni di aggregazione con espressioni condizionali.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
