+++
title = "SQLLeetCode - 1661 - Average Time Of Process Per Machine"
date = 2026-02-25T14:01:37Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the average time each machine takes to complete a process.
> The time to complete a process is the 'end' timestamp minus the 'start' timestamp. The average time is calculated by the total time to complete every process on the machine divided by the number of processes that were run.
> 
> The resulting table should have the machine_id along with the average time as processing_time, which should be rounded to 3 decimal places.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Activity contiene le attività delle macchine: `machine_id` (ID della macchina), `process_id` (ID del processo), `activity_type` (tipo di attività: 'start' o 'end'), `timestamp` (timestamp dell'attività).

L'obiettivo è calcolare il tempo medio di elaborazione per ogni macchina. Per ogni processo su una macchina, il tempo è calcolato come la differenza tra il timestamp di 'end' e quello di 'start'.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
ON a1.machine_id = a2.machine_id
AND a1.process_id = a2.process_id
AND a1.activity_type = 'start'
AND a2.activity_type = 'end'
GROUP BY a1.machine_id
```

In questa query:
- La query usa un self-join sulla tabella Activity
- La tabella `a1` rappresenta le attività di tipo 'start'
- La tabella `a2` rappresenta le attività di tipo 'end'
- La condizione di join `a1.machine_id = a2.machine_id AND a1.process_id = a2.process_id` associa ogni start con il suo end corrispondente sulla stessa macchina e processo
- `a2.timestamp - a1.timestamp` calcola il tempo di elaborazione per ogni processo
- `AVG(...)` calcola la media dei tempi per ogni machine_id
- `ROUND(..., 3)` arrotonda il risultato a 3 decimali
- `GROUP BY a1.machine_id` raggruppa i risultati per macchina

Questo esercizio richiede un self-join per collegare start e end dello stesso processo.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
