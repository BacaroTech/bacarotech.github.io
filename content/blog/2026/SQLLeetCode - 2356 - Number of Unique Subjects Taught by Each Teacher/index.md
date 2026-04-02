+++
title = "SQLLeetCode - 2356 - Number of Unique Subjects Taught by Each Teacher"
date = 2026-02-25T14:01:43Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to calculate the number of unique subjects each teacher teaches in the university.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Teacher contiene le informazioni sugli insegnanti: `teacher_id`, `subject_id`, `dept_id`.

L'obiettivo è contare il numero di materie uniche insegnate da ciascun insegnante. Poiché un insegnante può insegnare la stessa materia in dipartimenti diversi, dobbiamo contare solo le materie distinte per ogni insegnante.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id
```

In questa query:
- `COUNT(DISTINCT subject_id)` conta le materie uniche per ogni insegnante, evitando duplicati
- `GROUP BY teacher_id` raggruppa i risultati per insegnante

Questo è un semplice esercizio di aggregazione con DISTINCT.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
