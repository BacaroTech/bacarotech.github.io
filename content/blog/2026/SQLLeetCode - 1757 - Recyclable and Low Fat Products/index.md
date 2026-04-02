+++
title = "SQLLeetCode - 1757 - Recyclable and Low Fat Products"
date = 2026-02-25T14:01:41Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the ids of products that are both low fat and recyclable.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Products contiene le informazioni sui prodotti: `product_id` (ID del prodotto), `low_fats` (indica se il prodotto è a basso contenuto di grassi - 'Y' o 'N'), `recyclable` (indica se il prodotto è riciclabile - 'Y' o 'N').

L'obiettivo è trovare tutti i prodotti che sono sia a basso contenuto di grassi ('Y') che riciclabili ('Y'). Dobbiamo applicare un filtro che soddisfi entrambe le condizioni.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y'
```

In questa query:
- Selezioniamo la colonna `product_id` dalla tabella Products
- La clausola `WHERE` filtra i record usando l'operatore `AND` per includere solo i prodotti che soddisfano entrambe le condizioni:
  - `low_fats = 'Y'` verifica che il prodotto sia a basso contenuto di grassi
  - `recyclable = 'Y'` verifica che il prodotto sia riciclabile
- L'operatore `AND` garantisce che entrambe le condizioni siano vere contemporaneamente

Questo è un esercizio molto semplice che richiede solo una query di selezione con un filtro su due condizioni combinate con AND.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
