+++
title = "SQLLeetCode - 1164 - Product Price at a Given Date"
date = 2026-02-25T14:01:28Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the prices of all products on 2019-08-16. Assume the price of all products before any change is 10.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Products contiene le informazioni sui prezzi dei prodotti: `product_id`, `new_price`, `change_date`.

L'obiettivo è trovare il prezzo di tutti i prodotti alla data specifica (2019-08-16). La regola è:
- Se un prodotto non ha avuto modifiche prima di quella data, il prezzo è 10
- Altrimenti, il prezzo è quello dell'ultima modifica effettuata prima o alla data specificata

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT product_id, new_price AS price
FROM Products
WHERE (product_id, change_date) IN (
    SELECT product_id, MAX(change_date) AS recent_date
    FROM Products
    WHERE change_date <= '2019-08-16'
    GROUP BY product_id
)
UNION ALL
SELECT product_id, 10 AS price
FROM Products
WHERE product_id NOT IN (
    SELECT product_id
    FROM Products
    WHERE change_date <= '2019-08-16'
)
```

In questa query:
- La prima parte della UNION seleziona i prodotti che hanno avuto almeno una modifica prima della data specificata, usando la subquery per ottenere l'ultima modifica (MAX change_date) per ciascun prodotto
- La seconda parte seleziona i prodotti che non hanno avuto modifiche prima della data, assegnando loro il prezzo predefinito di 10
- `UNION ALL` combina i due risultati

Questo esercizio richiede l'uso di UNION per gestire due casi differenti: prodotti con e senza modifiche.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)