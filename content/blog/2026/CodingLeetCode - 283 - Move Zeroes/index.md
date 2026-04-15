+++
title = "CodingLeetCode - 283 - Move Zeroes"
date = 2026-02-25T14:00:30Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
> Note that you must do this in-place without making a copy of the array.

Possiamo risolvere questo problema rimuovendo gli zeri e aggiungendoli alla fine, come nel codice proposto.

L’idea chiave è:

- scorriamo l’array elemento per elemento
- quando troviamo uno zero, lo rimuoviamo usando splice
- teniamo traccia del numero di zeri rimossi
- non incrementiamo l’indice dopo la rimozione, perché gli elementi si spostano
- se l’elemento non è zero, passiamo al successivo
- al termine della scansione, aggiungiamo tanti zeri quanti ne abbiamo rimossi

Questo approccio permette di ottenere una soluzione corretta e mantiene l’ordine relativo degli elementi. Tuttavia, ha una complessità O(n²) a causa delle operazioni di splice, che spostano gli elementi dell’array: una soluzione più efficiente utilizza due puntatori e lavora in O(n) senza operazioni costose.

```typescript
/**
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums: number[]): void {
    let zeroRemoved: number = 0;
    let i:number = 0;
    while(i < nums.length){
        if(nums[i] == 0){
            nums.splice(i, 1);
            zeroRemoved++;
        }else{
            i++;
        }
    }
    for(let i = 0; i < zeroRemoved; i++){
        nums.push(0);
    }
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)