+++
title = "SQLLeetCode - 1193 - Monthly Transactions I"
date = 2026-02-25T14:01:30Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write an SQL query to find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Transactions contiene le informazioni sulle transazioni: `id`, `country`, `state` (approved/void), `amount`, `trans_date`.

L'obiettivo è raggruppare le transazioni per mese (anno-mese) e paese, e calcolare:
- Il numero totale di transazioni (`trans_count`)
- Il numero di transazioni approvate (`approved_count`)
- L'importo totale delle transazioni (`trans_total_amount`)
- L'importo totale delle transazioni approvate (`approved_total_amount`)

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT 
    SUBSTRING(trans_date, 1, 7) AS month,
    country,
    COUNT(*) AS trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country
```

In questa query:
- `SUBSTRING(trans_date, 1, 7)` estrae l'anno e il mese dalla data (formato YYYY-MM)
- `COUNT(*)` conta tutte le transazioni per ogni gruppo
- `SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END)` conta le transazioni approvate
- `SUM(amount)` somma l'importo di tutte le transazioni
- `SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END)` somma solo gli importi delle transazioni approvate
- `GROUP BY month, country` raggruppa per mese e paese

Questo esercizio richiede l'uso di aggregazioni condizionali con CASE.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
