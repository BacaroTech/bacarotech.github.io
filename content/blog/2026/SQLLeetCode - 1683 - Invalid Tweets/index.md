+++
title = "SQLLeetCode - 1683 - Invalid Tweets"
date = 2026-02-25T14:01:38Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find the IDs of the invalid tweets. The tweet is invalid if the number of characters used in the content of the tweet is strictly greater than 15.
>
> Return the result table in any order.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Tweets contiene le informazioni sui tweet: `tweet_id` (ID del tweet), `content` (contenuto del tweet).

L'obiettivo è trovare tutti i tweet che hanno un contenuto con più di 15 caratteri. Dobbiamo calcolare la lunghezza del contenuto e filtrare quelli che superano questo limite.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT tweet_id
FROM Tweets
WHERE LENGTH(content) > 15
```

In questa query:
- Selezioniamo la colonna `tweet_id` dalla tabella Tweets
- La clausola `WHERE LENGTH(content) > 15` filtra solo i tweet il cui contenuto ha più di 15 caratteri
- La funzione `LENGTH()` (o `CHAR_LENGTH()` in alcuni database) restituisce il numero di caratteri della stringa

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
