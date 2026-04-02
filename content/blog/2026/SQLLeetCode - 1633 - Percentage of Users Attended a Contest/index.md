+++
title = "SQLLeetCode - 1633 - Percentage of Users Attended a Contest"
date = 2026-02-25T14:01:36Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the percentage of the users registered in each contest rounded to two decimals.
>
> Return the result table ordered by percentage in descending order. In case of a tie, order it by contest_id in ascending order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Users (con user_id) e Register (con contest_id, user_id).

L'obiettivo è calcolare la percentuale di utenti che hanno partecipato a ciascun concorso. La percentuale è calcolata come (numero di utenti unici iscritti al concorso / numero totale di utenti) * 100.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT 
    contest_id, 
    ROUND(COUNT(DISTINCT user_id) * 100 / (SELECT COUNT(user_id) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id
```

In questa query:
- La subquery `(SELECT COUNT(user_id) FROM Users)` calcola il numero totale di utenti
- `COUNT(DISTINCT user_id)` conta gli utenti unici iscritti a ciascun concorso
- La moltiplicazione per 100 e la divisione per il totale utenti dà la percentuale
- `ROUND(..., 2)` arrotonda il risultato a 2 decimali
- `GROUP BY contest_id` raggruppa i risultati per concorso
- `ORDER BY percentage DESC, contest_id` ordina prima per percentuale decrescente, poi per contest_id crescente

Questo esercizio richiede l'uso di una subquery per ottenere il conteggio totale degli utenti.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
