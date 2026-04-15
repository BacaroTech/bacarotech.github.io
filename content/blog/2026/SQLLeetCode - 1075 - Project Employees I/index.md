+++
title = "SQLLeetCode - 1075 - Project Employees I"
date = 2026-02-25T14:01:25Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the average experience years of all the employees for each project rounded to 2 digit
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Project (con project_id, employee_id) e Employee (con employee_id, name, experience_years).

L'obiettivo è calcolare la media degli anni di esperienza per ogni progetto. Ogni progetto può avere più dipendenti, e dobbiamo calcolare la media degli anni di esperienza di tutti i dipendenti assegnati a quel progetto.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
LEFT JOIN Employee e
ON p.employee_id = e.employee_id
GROUP BY p.project_id
```

In questa query:
- La `LEFT JOIN` tra Project e Employee mantiene tutti i progetti, anche quelli senza dipendenti assegnati
- La condizione `ON p.employee_id = e.employee_id` collega ogni record del progetto al relativo dipendente
- `AVG(e.experience_years)` calcola la media degli anni di esperienza per ogni progetto
- `ROUND(..., 2)` arrotonda il risultato a 2 decimali
- `GROUP BY p.project_id` raggruppa i risultati per progetto

Questo esercizio è un classico esempio di JOIN con aggregazione e calcolo della media.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
