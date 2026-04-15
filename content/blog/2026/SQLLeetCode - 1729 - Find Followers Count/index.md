+++
title = "SQLLeetCode - 1729 - Find Followers Count"
date = 2026-02-25T14:01:39Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution that will, for each user, return the number of followers.
>
> Return the result table ordered by user_id in ascending order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Followers contiene le informazioni sui follower: `user_id` (l'utente che viene seguito), `follower_id` (l'utente che segue).

L'obiettivo è contare il numero di follower per ogni utente. Poiché un utente può avere più follower, dobbiamo raggruppare per user_id e contare i follower distinti.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT user_id, COUNT(DISTINCT follower_id) AS followers_count
FROM Followers
GROUP BY user_id
```

In questa query:
- `COUNT(DISTINCT follower_id)` conta i follower unici per ogni utente
- `GROUP BY user_id` raggruppa i risultati per utente
- Il risultato mostra per ogni user_id il numero di follower distinti

Questo è un semplice esercizio di aggregazione con GROUP BY.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
