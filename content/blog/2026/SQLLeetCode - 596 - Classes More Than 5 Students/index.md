+++
title = "SQLLeetCode - 596 - Classes More Than 5 Students"
date = 2026-02-25T14:01:19Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find all classes that have at least five students.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Courses contiene le informazioni sugli studenti iscritti ai corsi: `student` (nome dello studente), `class` (nome del corso).

L'obiettivo è trovare tutti i corsi che hanno almeno cinque studenti iscritti. Per fare ciò, dobbiamo raggruppare gli studenti per classe e contare quanti studenti ci sono in ciascun corso, poi filtrare quelli con count >= 5.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT class
FROM (
  SELECT class, COUNT(*) AS countMember
  FROM Courses
  GROUP BY class
) AS groupCourses
WHERE countMember >= 5
```

In questa query:
- La subquery  raggruppa i record della tabella Courses per `class` e conta il numero di studenti in ogni corso usando `COUNT(*)`
- L'alias `countMember` memorizza il conteggio per ogni classe
- La query esterna seleziona solo le classi dove `countMember >= 5`, cioè quelle con almeno cinque studenti

Un'altra possibile soluzione più diretta:

```sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(*) >= 5
```

Questa versione utilizza la clausola `HAVING` che permette di filtrare direttamente dopo il `GROUP BY`, senza bisogno di una subquery. È più efficiente e leggibile.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
