+++
title = "CodingLeetCode - 1108 - Defanging an IP Address"
date = 2026-02-25T14:00:35Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a valid (IPv4) IP address address, return a defanged version of that IP address.
>  defanged IP address replaces every period "." with "[.]".

Possiamo risolvere questo problema dividendo l’indirizzo IP nelle sue componenti e ricostruendolo con la forma richiesta, come nel codice proposto.

L’idea chiave è:

dividiamo la stringa dell’IP utilizzando il punto come separatore
otteniamo così le quattro parti dell’indirizzo IPv4
ricostruiamo la stringa inserendo tra ogni parte la sequenza "[.]"
restituiamo il risultato finale

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza della stringa, ed è semplice e diretto. Tuttavia, nel codice proposto la soluzione è rigida perché assume sempre quattro segmenti: una versione più generale può semplicemente sostituire tutti i . con "[.]" senza dover gestire manualmente le parti dell’array.

```typescript
function defangIPaddr(address: string): string {
    let singlePieces: string[] = address.split('.');
    return singlePieces[0] + "[.]" + singlePieces[1] + "[.]" + singlePieces[2] + "[.]" + singlePieces[3];
};
```

