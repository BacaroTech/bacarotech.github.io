+++
title = "SQLLeetCode - 595 - Big Countries"
date = 2026-02-25T14:01:18Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> A country is big if:
> - it has an area of at least 3,000,000 km², or
> - it has a population of at least 25,000,000.
>
> Write a SQL query to report the name, population, and area of the big countries.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella World contiene le informazioni sui paesi: `name` (nome del paese), `population` (popolazione), `area` (superficie in km²).

L'obiettivo è trovare tutti i paesi "grandi" che soddisfano almeno una delle due condizioni:
- area >= 3,000,000 (superficie di almeno 3 milioni di km²)
- population >= 25,000,000 (popolazione di almeno 25 milioni)

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000
```

In questa query:
- Selezioniamo le colonne `name`, `population`, e `area` dalla tabella World
- La clausola `WHERE` filtra i record usando l'operatore `OR` per includere i paesi che soddisfano almeno una delle due condizioni
- `area >= 3000000` verifica se la superficie è maggiore o uguale a 3 milioni di km²
- `population >= 25000000` verifica se la popolazione è maggiore o uguale a 25 milioni

Questo è un esercizio semplice che richiede solo una query di selezione con un filtro basato su condizioni multiple unite da OR.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)