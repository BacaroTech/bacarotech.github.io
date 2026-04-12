+++
title = "CodingLeetCode - 1470 - Shuffle the Array"
date = 2026-02-25T14:00:37Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].
> Return the array in the form [x1,y1,x2,y2,...,xn,yn].

Possiamo risolvere questo problema intercalando gli elementi delle due metà dell’array, come nel codice proposto.

L’idea chiave è:

- dividiamo logicamente l’array in due metà: la prima contiene gli elementi x, la seconda gli elementi y
- calcoliamo la metà della lunghezza dell’array
- scorriamo i primi n elementi
- per ogni indice i:
    - aggiungiamo nums[i] (parte sinistra)
    - aggiungiamo nums[i + n] (parte destra)
- continuiamo fino a ricostruire l’array alternato

Questo approccio permette di ottenere una complessità O(n), dove n è la metà della lunghezza dell’array, ed è efficiente perché costruisce direttamente il risultato senza passaggi aggiuntivi o riorganizzazioni intermedie.

```typescript
function shuffle(nums: number[], n: number): number[] {
    let numsShuffle: number[] = [];
    let halfSize = nums.length / 2;

    for(let i = 0; i < n; i++){
        numsShuffle.push(nums[i]);
        numsShuffle.push(nums[i + halfSize]);
    }
    
    return numsShuffle;
};
```

