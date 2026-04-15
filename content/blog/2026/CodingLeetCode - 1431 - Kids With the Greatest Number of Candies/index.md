+++
title = "CodingLeetCode - 1431 - Kids With the Greatest Number of Candies"
date = 2026-02-25T14:00:36Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an array candies, where candies[i] represents the number of candies the i-th kid has, and an integer extraCandies.
> Return a boolean array result, where result[i] is true if, after giving the i-th kid all the extraCandies, they will have the greatest number of candies among all kids.

Possiamo risolvere questo problema confrontando ogni bambino con il massimo attuale, come nel codice proposto.

L’idea chiave è:

- troviamo il valore massimo dell’array candies
- questo rappresenta il numero di caramelle del bambino più “ricco” inizialmente
- per ogni bambino, simuliamo l’aggiunta di extraCandies
- controlliamo se il nuovo valore è maggiore o uguale al massimo
- se sì, inseriamo true nel risultato
- altrimenti inseriamo false
- continuiamo fino a valutare tutti i bambini

Questo approccio permette di ottenere una complessità O(n), dove n è il numero di elementi nell’array, ed è efficiente perché calcola il massimo una sola volta e poi fa un singolo passaggio per costruire il risultato.

```typescript
function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let maxCandies: number = Math.max(...candies);
    let resultesCandies: boolean[] = [];
    candies.forEach(candiesForChild => {
        if(candiesForChild + extraCandies >= maxCandies){
            resultesCandies.push(true);
        }else{
            resultesCandies.push(false);
        }
    })
    return resultesCandies;
    
};
```

