+++
title = "SQLLeetCode - 1174 - Immediate Food Delivery II"
date = 2026-02-25T14:01:29Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the percentage of immediate orders in the first orders of all customers, rounded to 2 decimal places.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Delivery contiene le informazioni sulle consegne: `delivery_id`, `customer_id`, `order_date`, `customer_pref_delivery_date`.

L'obiettivo è calcolare la percentuale di ordini immediati rispetto al primo ordine di ogni cliente. Un ordine è considerato "immediato" se `order_date = customer_pref_delivery_date`, cioè se la data di consegna coincide con la data preferita del cliente.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT ROUND(SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) * 100 / COUNT(*), 2) AS immediate_percentage
FROM (
    SELECT customer_id, MIN(order_date) AS order_date, MIN(customer_pref_delivery_date) AS customer_pref_delivery_date
    FROM Delivery
    GROUP BY customer_id
) AS first_orders
```

In questa query:
- La subquery interna seleziona il primo ordine di ogni cliente usando `MIN(order_date)` e la corrispondente `customer_pref_delivery_date`
- `GROUP BY customer_id` raggruppa per cliente
- Nella query esterna, `CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END` restituisce 1 se l'ordine è immediato, 0 altrimenti
- `SUM(...) * 100 / COUNT(*)` calcola la percentuale
- `ROUND(..., 2)` arrotonda a 2 decimali

Questo esercizio richiede l'uso di subquery per ottenere il primo ordine di ogni cliente e poi calcolare la percentuale.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)