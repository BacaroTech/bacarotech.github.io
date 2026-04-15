+++
title = "CodingLeetCode - 88 - Merge Sorted Array"
date = 2026-02-25T14:00:22Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
> Merge nums2 into nums1 as one sorted array.
> The final sorted array should not be returned, but instead be stored inside nums1.

Possiamo risolvere questo problema unendo i due array ordinati, come nel codice proposto, utilizzando una struttura temporanea per costruire il risultato.

L’idea chiave è:

- utilizziamo due puntatori per scorrere nums1 e nums2 fino agli indici m e n
- confrontiamo gli elementi correnti dei due array
- inseriamo il valore minore in un array temporaneo
- avanziamo il puntatore dell’array da cui abbiamo preso l’elemento
- una volta esaurito uno dei due array, aggiungiamo tutti gli elementi rimanenti dell’altro
- infine, copiamo il contenuto dell’array temporaneo dentro nums1

Questo approccio permette di ottenere una complessità O(m + n) ed è semplice da implementare. Tuttavia, utilizza memoria aggiuntiva, mentre la soluzione ottimale sfrutta lo spazio già disponibile in nums1 e lavora al contrario (dalla fine), evitando l’uso di un array ausiliario.

```typescript
/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i:number = 0
    let j: number = 0;
    let ultimateArray: number[] = [];
  
    while(i < m && j < n){
        if(nums1[i] < nums2[j]){
            ultimateArray.push(nums1[i]);
            i++;
        }else{
            ultimateArray.push(nums2[j]);
            j++;
        }
    }

    while(i < m){
        ultimateArray.push(nums1[i]);
        i++;
    }

    while(j < n){
        ultimateArray.push(nums2[j]);
        j++;
    }

    for(let i = 0; i < m+n; i++){
        nums1[i] = ultimateArray[i];
    }
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)