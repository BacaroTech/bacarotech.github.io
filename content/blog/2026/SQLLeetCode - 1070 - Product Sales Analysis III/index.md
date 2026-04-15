+++
title = "SQLLeetCode - 1070 - Product Sales Analysis III"
date = 2026-02-25T14:01:24Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the first year of sales for each product id.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Sales contiene le informazioni sulle vendite: `sale_id`, `product_id`, `year`, `quantity`, `price`.

L'obiettivo è trovare per ogni prodotto l'anno della prima vendita (l'anno più vecchio). Dobbiamo selezionare la riga con l'anno minimo per ogni prodotto.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT product_id, year AS first_year, quantity, price
FROM Sales
WHERE (product_id, year) IN (
    SELECT product_id, MIN(year)
    FROM Sales
    GROUP BY product_id
)
```

In questa query:
- La subquery `SELECT product_id, MIN(year) FROM Sales GROUP BY product_id` trova l'anno minimo (prima vendita) per ogni prodotto
- La query esterna seleziona tutte le colonne dalla tabella Sales per i record che corrispondono a quella coppia (product_id, year)
- La condizione `WHERE (product_id, year) IN (...)` filtra le righe dove entrambi i valori sono nella lista delle prime vendite

Questo esercizio richiede l'uso di subquery con tuple per selezionare le righe con il valore minimo per gruppo.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)