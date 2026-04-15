+++
title = "SQLLeetCode - 1045 - Customers Who Bought All Products"
date = 2026-02-25T14:01:22Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the customer_id of customers that bought all the products.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Customer (con customer_id, product_key) e Product (con product_key).

L'obiettivo è trovare i clienti che hanno acquistato tutti i prodotti disponibili. Dobbiamo confrontare il numero di prodotti acquistati da ogni cliente con il numero totale di prodotti disponibili.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(product_key) FROM Product)
```

In questa query:
- `GROUP BY customer_id` raggruppa gli acquisti per cliente
- `COUNT(DISTINCT product_key)` conta i prodotti distinti acquistati da ogni cliente
- La subquery `(SELECT COUNT(product_key) FROM Product)` calcola il numero totale di prodotti disponibili
- `HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(product_key) FROM Product)` filtra solo i clienti che hanno acquistato tutti i prodotti (il conteggio dei loro prodotti uguale al totale)

Questo esercizio richiede l'uso di subquery per ottenere il conteggio totale dei prodotti da confrontare con il conteggio per cliente.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)