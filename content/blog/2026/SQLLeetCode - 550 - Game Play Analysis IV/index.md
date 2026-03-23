+++
title = "SQLLeetCode - 550 - Game Play Analysis IV"
date = 2026-02-25T14:01:14Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the fraction of players that logged in again on the day after the day they first logged in, rounded to 2 decimal places. 
> 
> In other words, you need to determine the number of players who logged in on the day immediately following their initial login, and divide it by the number of total players.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Activity registra gli accessi degli utenti nel tempo, identificando ogni giocatore tramite player_id e ogni login tramite la data event_date.

L’obiettivo è quindi individuare i giocatori che hanno effettuato un secondo accesso esattamente il giorno successivo al loro primo login, e poi calcolare la frazione rispetto al numero totale di giocatori.

Per farlo:

- si individua per ogni giocatore la data del primo login (MIN(event_date))
- si verifica se esiste un login il giorno successivo (DATE_SUB)
- si conta quanti giocatori soddisfano questa condizione
- si divide per il numero totale di giocatori distinti
- infine si arrotonda il risultato a 2 decimali

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT
  ROUND(COUNT(DISTINCT player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM
  Activity
WHERE
  (player_id, DATE_SUB(event_date, INTERVAL 1 DAY))
  IN (
    SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id
)
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)