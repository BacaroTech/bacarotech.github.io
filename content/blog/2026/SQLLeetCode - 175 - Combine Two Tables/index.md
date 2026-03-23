+++
title = "SQLLeetCode - 175 - Combine Two Tables"
date = 2026-02-25T14:01:10Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'sql']
authors = []
series = ["SQLLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode a tema SQL:

> Write a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead.
>
> Return the result table in any order.

Guardando le tabelle fornite dall’esercizio si può notare che la tabella Person contiene le informazioni anagrafiche (firstName, lastName) identificate da personId, mentre la tabella Address contiene città e stato associati allo stesso personId. Tuttavia, non è garantito che ogni persona abbia un indirizzo corrispondente nella tabella Address.

Di conseguenza, per includere comunque tutte le persone anche quando non esiste un indirizzo associato, è necessario utilizzare una LEFT JOIN, che restituisce tutti i record della tabella Person e inserisce NULL nei campi di Address quando non c’è corrispondenza.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```sql
select p.firstName, p.lastName, a.city, a.state
from Person p left join Address a on p.personId = a.personId
order by p.firstname
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)