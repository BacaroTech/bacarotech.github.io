+++
title = "CodingLeetCode - 771 - Jewels and Stones"
date = 2026-02-25T14:00:34Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You're given strings jewels representing the types of stones that are jewels, and stones representing the stones you have.
> Each character in stones is a type of stone you have.
> You want to know how many of the stones you have are also jewels.

Possiamo risolvere questo problema usando una struttura dati che ci permetta di verificare rapidamente se un carattere è un “jewel”, come nel codice proposto.

L’idea chiave è:

- creiamo una mappa contenente tutti i caratteri presenti in jewels
- inizializziamo per ciascun jewel un contatore a 0
- scorriamo la stringa stones
- se uno stone è presente nella mappa, incrementiamo il suo contatore
- alla fine sommiamo tutti i valori della mappa per ottenere il risultato finale

Questo approccio permette di ottenere una complessità O(n + m), dove n è la lunghezza di jewels e m è la lunghezza di stones. È una soluzione corretta e chiara, anche se si può semplificare ulteriormente usando un Set invece di una Map, evitando il conteggio per singolo carattere e incrementando direttamente un totale durante la scansione.

```typescript
function numJewelsInStones(jewels: string, stones: string): number {
    let mapJewels : Map<string, number> = new Map<string, number>();
    let sum: number = 0;
    for(let i = 0; i < jewels.length; i++){
        mapJewels.set(jewels[i], 0)
    }
    
    for(let i = 0; i < stones.length; i++){

        if(mapJewels.get(stones[i]) != undefined){
            mapJewels.set(stones[i], mapJewels.get(stones[i]) + 1)
        }
    }

    Array.from(mapJewels, ([name, value]) => ( value )).forEach(data => {
        sum += data;
    }); 

    return sum;
};
```

