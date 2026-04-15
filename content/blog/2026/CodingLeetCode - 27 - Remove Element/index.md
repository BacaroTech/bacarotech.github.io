+++
title = "CodingLeetCode - 27 - Remove Element"
date = 2026-02-25T14:00:17Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
> The order of the elements may be changed.
> Return the number of elements in nums which are not equal to val.

Possiamo risolvere questo problema modificando direttamente l’array durante l’iterazione, come nel codice proposto.

L’idea chiave è:

- scorriamo l’array utilizzando un indice
- se troviamo un elemento uguale a val, lo rimuoviamo con splice
- non incrementiamo l’indice dopo la rimozione, perché gli elementi successivi vengono spostati
- se l’elemento è diverso da val, passiamo a quello successivo
- continuiamo fino alla fine dell’array

Questo approccio permette di ottenere una soluzione corretta, ma con una complessità O(n²), perché ogni rimozione comporta uno shift degli elementi. Una soluzione più efficiente utilizza due puntatori e lavora in O(n), evitando operazioni costose sull’array.

```typescript
function removeElement(nums: number[], val: number): number {
    let i: number = 0;
   
    while(i < nums.length){
        if(nums[i] == val){
            nums.splice(i, 1);
        }else{
            i++;
        }
    }
    return nums.length;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)