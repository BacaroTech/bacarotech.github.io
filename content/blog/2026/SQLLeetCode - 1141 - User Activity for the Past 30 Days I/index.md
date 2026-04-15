+++
title = "SQLLeetCode - 1141 - User Activity for the Past 30 Days I"
date = 2026-02-25T14:01:26Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the daily active user count for a 30-day period ending on 2019-07-27 inclusively. A user became active on a given day if they made at least one activity on that day.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Activity contiene le informazioni sulle attività degli utenti: `user_id`, `activity_date`, `activity_type`, `activity_id`.

L'obiettivo è calcolare il numero di utenti attivi per ogni giorno in un periodo di 30 giorni che termina il 2019-07-27. Dobbiamo considerare solo gli utenti unici che hanno effettuato almeno un'attività in quel giorno.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM (
    SELECT DISTINCT user_id, activity_date
    FROM Activity
) AS aux
WHERE activity_date > '2019-06-27' AND activity_date <= '2019-07-27'
GROUP BY activity_date
```

In questa query:
- La subquery interna `SELECT DISTINCT user_id, activity_date` rimuove i duplicati per utente-giorno, perché un utente può fare più attività nello stesso giorno
- La clausola `WHERE activity_date > '2019-06-27' AND activity_date <= '2019-07-27'` filtra le date per il periodo di 30 giorni richiesto
- `COUNT(DISTINCT user_id)` conta gli utenti unici attivi per ogni giorno
- `GROUP BY activity_date` raggruppa i risultati per giorno

Questo esercizio richiede l'uso di subquery per eliminare i duplicati prima del conteggio.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)