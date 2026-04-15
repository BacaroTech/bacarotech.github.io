+++
title = "CodingLeetCode - 26 - Remove Duplicates from Sorted Array"
date = 2026-02-25T14:00:16Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.
> The relative order of the elements should be kept the same.
> Return the number of unique elements.

Possiamo risolvere questo problema modificando direttamente l’array durante l’iterazione, come nel codice proposto.

L’idea chiave è:

- partiamo dal secondo elemento dell’array
- confrontiamo ogni elemento con quello precedente
- se sono uguali, significa che abbiamo trovato un duplicato
- in questo caso rimuoviamo l’elemento usando splice
- non incrementiamo l’indice, perché dopo la rimozione gli elementi si spostano
- se invece sono diversi, passiamo all’elemento successivo
- continuiamo fino alla fine dell’array

Questo approccio permette di ottenere una soluzione corretta, ma con una complessità O(n²), perché ogni splice comporta uno spostamento degli elementi. Una soluzione più ottimale utilizza due puntatori e lavora in O(n), evitando operazioni costose sull’array.

```typescript
function removeDuplicates(nums: number[]): number {
    
    let i = 1;
    while(i < nums.length){
        console.log(nums[i], nums[i-1]);
        if(nums[i] == nums[i-1]){
            let x = nums.splice(i, 1);
            console.log(i, " remove this: ", x)
        }else{
            i++;
        }
    }

    return nums.length;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
