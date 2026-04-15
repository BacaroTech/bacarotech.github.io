+++
title = "SQLLeetCode - 570 - Managers with at Least 5 Direct Reports"
date = 2026-02-25T14:01:15Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find managers with at least five direct reports.
> 
> Return the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Employee contiene sia i dipendenti che i manager, e il campo managerId indica a quale manager ogni dipendente riporta.

L’obiettivo è quindi individuare i manager che hanno almeno 5 dipendenti diretti (direct reports).

Per farlo:

- nella sottoquery (E2) raggruppiamo i record per managerId
- contiamo quanti dipendenti ha ciascun manager (COUNT(*))
- filtriamo solo quelli con almeno 5 (HAVING COUNT(*) >= 5)
- infine facciamo una JOIN con la tabella Employee per ottenere il nome del manager

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT E1.name
FROM Employee E1
JOIN (
    SELECT managerId, COUNT(*) AS directReports
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) E2 ON E1.id = E2.managerId;
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)