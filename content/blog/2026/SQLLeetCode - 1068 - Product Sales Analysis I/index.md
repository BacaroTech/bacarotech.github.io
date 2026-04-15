+++
title = "SQLLeetCode - 1068 - Product Sales Analysis I"
date = 2026-02-25T14:01:23Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the product_name, year, and price for each sales entry in the Sales table.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Sales (con sale_id, product_id, year, quantity, price) e Product (con product_id, product_name).

L'obiettivo è unire le due tabelle per ottenere il nome del prodotto insieme alle informazioni di vendita. Dobbiamo collegare le tabelle usando product_id come chiave di join.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p
ON s.product_id = p.product_id
```

In questa query:
- Selezioniamo `product_name` dalla tabella Product (alias p), `year` e `price` dalla tabella Sales (alias s)
- La clausola `JOIN` (che è un INNER JOIN di default) unisce le due tabelle
- La condizione `ON s.product_id = p.product_id` specifica che il join avviene matchingando i product_id
- Solo i record che hanno un corrispondente in entrambe le tabelle saranno inclusi nel risultato

Questo esercizio è un classico esempio di JOIN tra due tabelle per combinare informazioni da entrambe.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)