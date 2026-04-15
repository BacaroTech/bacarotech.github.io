+++
title = "SQLLeetCode - 1378 - Replace Employee Id With The Unique Identifier"
date = 2026-02-25T14:01:34Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to show the unique ID of each user, If a user does not have a unique ID replace just show null.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Employees (con id e name) e EmployeeUNI (con id e unique_id).

L'obiettivo è unire le due tabelle per ottenere per ogni dipendente il suo unique_id dalla tabella EmployeeUNI. Dobbiamo usare una LEFT JOIN perché vogliamo includere tutti i dipendenti, anche quelli che non hanno un unique_id assegnato (in quel caso unique_id sarà NULL).

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT euni.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI euni
ON e.id = euni.id
```

In questa query:
- Selezioniamo `unique_id` dalla tabella EmployeeUNI (alias euni) e `name` dalla tabella Employees (alias e)
- La clausola `LEFT JOIN` unisce le due tabelle mantenendo tutti i record della tabella left (Employees)
- La condizione `ON e.id = euni.id` specifica come collegare le due tabelle: matching basato sul campo id
- Se un dipendente non ha un corrispondente nella tabella EmployeeUNI, il campo unique_id sarà NULL

Questo esercizio è un classico esempio di LEFT JOIN per mantenere tutti i record di una tabella anche quando non c'è corrispondenza nell'altra tabella.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
