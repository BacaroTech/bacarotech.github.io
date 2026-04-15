+++
title = "SQLLeetCode - 620 - Not Boring Movies"
date = 2026-02-25T14:01:21Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the interesting movies. An interesting movie has an id that is odd, and its description is not "boring".
>
> Return the result table sorted by rating in descending order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Cinema (o Movie) contiene le informazioni sui film: `id`, `movie`, `description`, `rating`.

L'obiettivo è trovare i film "interessanti" che soddisfano due condizioni:
1. L'ID del film è dispari (id % 2 = 1)
2. La descrizione non è "boring"

I risultati devono essere ordinati per rating in ordine decrescente.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 AND description != 'boring'
ORDER BY rating DESC
```

In questa query:
- La clausola `WHERE` filtra i record usando due condizioni combinate con `AND`:
  - `id % 2 = 1` verifica che l'ID sia dispari (l'operatore modulo)
  - `description != 'boring'` verifica che la descrizione non sia "boring"
- `ORDER BY rating DESC` ordina i risultati in base al rating in ordine decrescente (dal più alto al più basso)

Questo esercizio richiede solo una semplice query di selezione con filtri e ordinamento.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)