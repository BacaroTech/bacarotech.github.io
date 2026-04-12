+++
title = "CodingLeetCode - 239 - Sliding Window Maximum"
date = 2026-02-25T14:00:28Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given an array of integers nums, and there is a sliding window of size k which is moving from the very left of the array to the very right.
> You can only see the k numbers in the window.
> Each time the sliding window moves right by one position, return the maximum value in the window.

Possiamo risolvere questo problema calcolando il massimo per ogni finestra, come nel codice proposto.

L’idea chiave è:

- scorriamo l’array considerando ogni possibile finestra di dimensione k
- per ogni posizione i, analizziamo gli elementi da i a i + k - 1
- inizializziamo il massimo con il primo elemento della finestra
- confrontiamo tutti gli elementi della finestra per trovare il massimo
- aggiungiamo il massimo trovato all’array risultato
- continuiamo fino a coprire tutte le finestre possibili

Questo approccio permette di ottenere una complessità O(n * k), poiché per ogni finestra analizziamo k elementi. È una soluzione semplice e corretta, ma non ottimale: esiste un approccio con deque che consente di ottenere una complessità O(n), mantenendo il massimo aggiornato senza dover riesaminare ogni finestra da zero.

```typescript
function maxSlidingWindow(nums: number[], k: number): number[] {
    let numsMax: number[] = [];
    
    for(let i = 0; i < nums.length-k+1; i++){
        let max = nums[i];
        for(let j = i; j < i+k; j++){
            if(nums[j] > max){
                max = nums[j];
            }
        }
        numsMax.push(max);
    }

    return numsMax;
}

/*function maxSlidingWindow(nums: number[], k: number): number[] {
    let numsMax: number[] = [];
    let mapKPosition: Map<number, number[]> = new Map<number, number[]>();
    
    for(let i = 0; i < nums.length-k+1; i++){
        for(let j = i; j < i+k; j++){
            if(!mapKPosition.get(i)){
                mapKPosition.set(i, [nums[j]]);
            }else{
                let arrToModify: number[] = mapKPosition.get(i);
                arrToModify.push(nums[j]);
                mapKPosition.set(i, arrToModify);
            }
        }
    }

    console.log(mapKPosition);

    let keysArr: number[] = Array.from(mapKPosition.keys());

    for(let i = 0; i < keysArr.length; i++){
        numsMax.push(Math.max(...mapKPosition.get(i)));
    }

    return numsMax;
};*/
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)