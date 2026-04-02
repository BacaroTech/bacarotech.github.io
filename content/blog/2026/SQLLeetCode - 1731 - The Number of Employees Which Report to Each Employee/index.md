+++
title = "SQLLeetCode - 1731 - The Number of Employees Which Report to Each Employee"
date = 2026-02-25T14:01:40Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the ids and the names of all managers, the number of employees who report directly to them, and the average age of the reports rounded to the nearest integer.
>
> Return the result table ordered by employee_id.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Employees contiene le informazioni sui dipendenti: `employee_id`, `name`, `age`, `reports_to`.

L'obiettivo è per ogni manager (dipendente che ha altri riportanti), calcolare:
- Il numero di dipendenti che riportano a lui (`reports_count`)
- L'età media dei suoi riportanti (`average_age`), arrotondata all'intero più vicino

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT e.employee_id, e.name, sub.reports_count, sub.average_age
FROM (
    SELECT reports_to,
        COUNT(*) AS reports_count,
        ROUND(AVG(age)) AS average_age
    FROM Employees
    GROUP BY reports_to
    HAVING COUNT(*) >= 1
) AS sub
LEFT JOIN Employees e
ON sub.reports_to = e.employee_id
ORDER BY e.employee_id
```

In questa query:
- La subquery raggruppa i dipendenti per `reports_to` (il manager a cui riportano)
- `COUNT(*)` conta quanti dipendenti riportano a ogni manager
- `ROUND(AVG(age))` calcola l'età media dei riportanti arrotondata
- `HAVING COUNT(*) >= 1` assicura che includiamo solo i manager con almeno un riportante
- La `LEFT JOIN` con la tabella Employees unisce le informazioni per ottenere nome e employee_id del manager
- `ORDER BY e.employee_id` ordina i risultati per ID del manager

Questo esercizio richiede l'uso di subquery con aggregazione per calcolare le statistiche dei riportanti.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
