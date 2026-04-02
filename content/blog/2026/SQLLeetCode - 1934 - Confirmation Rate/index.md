+++
title = "SQLLeetCode - 1934 - Confirmation Rate"
date = 2026-02-25T14:01:42Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> The confirmation rate of a user is the number of 'confirmed' messages divided by the total number of requested confirmation messages. The confirmation rate of a user that did not request any confirmation messages is 0. Round the confirmation rate to two decimal places.
>
> Write a solution to find the confirmation rate of each user.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che ci sono due tabelle: Signups (con user_id, time_id) e Confirmations (con user_id, action, time_id).

L'obiettivo è calcolare il tasso di conferma per ogni utente. Il tasso di conferma è il numero di conferme 'confirmed' diviso per il totale delle richieste di conferma. Se un utente non ha richiesto alcuna conferma, il tasso è 0.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT A.user_id, ROUND(IFNULL(AVG(action = 'confirmed'), 0), 2) AS confirmation_rate
FROM Signups A
LEFT JOIN Confirmations B ON A.user_id = B.user_id
GROUP BY A.user_id
```

In questa query:
- La `LEFT JOIN` tra Signups e Confirmations mantiene tutti gli utenti, anche quelli senza conferme
- `AVG(action = 'confirmed')` è un trick MySQL dove 'confirmed' viene trattato come 1 e altri valori come 0, calcolando così la media delle conferme
- `IFNULL(..., 0)` gestisce il caso di utenti senza conferme, restituendo 0 invece di NULL
- `ROUND(..., 2)` arrotonda il risultato a 2 decimali
- `GROUP BY A.user_id` raggruppa i risultati per utente

Questo esercizio sfrutta il fatto che in MySQL le espressioni booleane restituiscono 1 o 0 per calcolare la media.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
