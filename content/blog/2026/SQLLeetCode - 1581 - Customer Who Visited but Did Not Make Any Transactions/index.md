+++
title = "SQLLeetCode - 1581 - Customer Who Visited but Did Not Make Any Transactions"
date = 2026-02-25T14:01:35Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Visits (con visit_id, customer_id, visit_date) e Transactions (con transaction_id, visit_id, amount).

L'obiettivo è trovare i clienti che hanno visitato il negozio ma non hanno effettuato alcuna transazione e quante volte lo hanno fatto. Per farlo, dobbiamo collegare le due tabelle e identificare le visite senza transazioni associate.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t
ON v.visit_id = t.visit_id
WHERE t.amount IS NULL
GROUP BY v.customer_id
```

In questa query:
- Usiamo una `LEFT JOIN` tra Visits e Transactions per mantenere tutte le visite, anche quelle senza transazioni
- La condizione `ON v.visit_id = t.visit_id` collega le visite alle relative transazioni
- La clausola `WHERE t.amount IS NULL` filtra solo le visite che non hanno una transazione associata (l'amount sarà NULL per le visite senza transazione)
- `GROUP BY v.customer_id` raggruppa i risultati per cliente
- `COUNT(v.visit_id)` conta il numero di visite senza transazione per ogni cliente

Questo esercizio combina LEFT JOIN con WHERE su colonne NULL per identificare i record senza corrispondenza.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
