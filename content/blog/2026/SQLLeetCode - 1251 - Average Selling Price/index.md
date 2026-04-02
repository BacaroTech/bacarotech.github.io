+++
title = "SQLLeetCode - 1251 - Average Selling Price"
date = 2026-02-25T14:01:32Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the average selling price for each product. average_price should be rounded to 2 decimal places. If a product does not have any sold units, its average selling price is assumed to be 0.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Prices (con product_id, start_date, end_date, price) e UnitsSold (con product_id, purchase_date, units).

L'obiettivo è calcolare il prezzo medio di vendita per ogni prodotto. Il prezzo medio è calcolato come la somma di (units * price) per ogni vendita, diviso per il totale delle unità vendute. Dobbiamo considerare solo le vendite che sono avvenute nel periodo di validità del prezzo.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT p.product_id, IFNULL(ROUND(SUM(units * price) / SUM(units), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
ON p.product_id = u.product_id
AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id
```

In questa query:
- La `LEFT JOIN` tra Prices e UnitsSold mantiene tutti i prodotti, anche quelli senza vendite
- La condizione `u.purchase_date BETWEEN p.start_date AND p.end_date` filtra solo le vendite avvenute nel periodo di validità del prezzo
- `SUM(units * price)` calcola il totale dei ricavi per ogni prodotto
- `SUM(units)` calcola il totale delle unità vendute
- La divisione tra i due dà il prezzo medio
- `IFNULL(..., 0)` gestisce i prodotti senza vendite, restituendo 0
- `ROUND(..., 2)` arrotonda a 2 decimali

Questo esercizio richiede attenzione al calcolo della media ponderata.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
