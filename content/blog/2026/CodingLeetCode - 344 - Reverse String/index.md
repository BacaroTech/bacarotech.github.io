+++
title = "CodingLeetCode - 344 - Reverse String"
date = 2026-02-25T14:00:31Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Write a function that reverses a string.
> The input string is given as an array of characters s.
> You must do this by modifying the input array in-place with O(1) extra memory.

Possiamo risolvere questo problema invertendo direttamente gli elementi dell’array, come nel codice proposto.

L’idea chiave è:

- utilizziamo due puntatori: uno all’inizio e uno alla fine dell’array
- scorriamo solo metà dell’array
- ad ogni iterazione scambiamo gli elementi simmetrici
- utilizziamo una variabile temporanea per effettuare lo scambio
- continuiamo fino a raggiungere il centro dell’array

Questo approccio permette di ottenere una complessità O(n) e spazio O(1), ed è ottimale perché modifica l’array direttamente senza utilizzare strutture dati aggiuntive.

```typescript
function reverseString(s: string[]): void {
    let aux: string;
    for(let i = 0; i < s.length/2; i++){
        aux = s[i];
        s[i] = s[s.length - 1 - i];
        s[s.length - 1 - i] = aux;
    }
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)