+++
title = "SQLLeetCode - 1148 - Article Views I"
date = 2026-02-25T14:01:27Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to find all the authors that viewed at least one of their own articles.
>
> Return the result table sorted by author_id.
>
> The author_id of the author is the same as the viewer_id of the view.

Guardando le tabelle fornite dall'esercizio si può notare che la tabella Views contiene le informazioni sulle visualizzazioni degli articoli: `article_id` (ID dell'articolo), `author_id` (ID dell'autore dell'articolo), `viewer_id` (ID di chi ha visualizzato l'articolo), `view_date` (data della visualizzazione).

L'obiettivo è trovare tutti gli autori che hanno visualizzato almeno uno dei propri articoli. Questo significa che dobbiamo trovare i record dove `author_id = viewer_id`, cioè quando l'autore e il visualizzatore sono la stessa persona.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id
```

In questa query:
- Selezioniamo la colonna `author_id` con alias `id` dalla tabella Views
- La clausola `WHERE author_id = viewer_id` filtra solo le visualizzazioni dove l'autore dell'articolo ha visualizzato il proprio articolo
- `DISTINCT` rimuove eventuali duplicati, assicurando che ogni autore appaia una sola volta
- `ORDER BY id` ordina i risultati per ID dell'autore in modo crescente

Questo esercizio richiede di confrontare due colonne nella stessa tabella per identificare le righe dove l'autore ha visualizzato il proprio articolo.

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)