+++
title = "CodingLeetCode - 169 - Majority Element"
date = 2026-02-25T14:00:26Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an array nums of size n, return the majority element.
> The majority element is the element that appears more than ⌊n / 2⌋ times.
> You may assume that the majority element always exists in the array.

Possiamo risolvere questo problema contando le occorrenze di ogni elemento, come nel codice proposto.

L’idea chiave è:

- utilizziamo una mappa per tenere traccia del numero di occorrenze di ciascun elemento
- scorriamo l’array e aggiorniamo il contatore per ogni numero
- una volta popolata la mappa, estraiamo tutte le chiavi
- per ogni chiave, verifichiamo se il numero di occorrenze è maggiore di n / 2
- quando troviamo l’elemento che soddisfa la condizione, lo restituiamo

Questo approccio permette di ottenere una complessità O(n), ma utilizza memoria aggiuntiva per la mappa. Esiste una soluzione più ottimale (algoritmo di Boyer-Moore) che permette di trovare l’elemento di maggioranza in O(n) tempo e O(1) spazio, evitando strutture dati ausiliarie.

```typescript
function majorityElement(nums: number[]): number {
    let mapRep: Map<number, number> = new Map<number, number>();
    
    nums.forEach(num => {
        if(mapRep.get(num)){
            mapRep.set(num, mapRep.get(num)+1);
        }else{
            mapRep.set(num,1)
        }
    });

    let arrayKeys: number[] = Array.from(mapRep.keys());
    let majorNum: number = -1;

    arrayKeys.forEach(key => {
        if(mapRep.get(key) > nums.length/2){
            majorNum = key;
        }
    });

    return majorNum;

};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)