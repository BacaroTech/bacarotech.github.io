+++
title = "CodingLeetCode - 66 - Plus One"
date = 2026-02-25T14:00:19Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given a large integer represented as an integer array digits, where each digits[i] is the i-th digit of the integer.
> The digits are ordered from most significant to least significant.
> Increment the large integer by one and return the resulting array of digits.

Possiamo risolvere questo problema simulando la somma di uno come faremmo manualmente, partendo dalla cifra meno significativa, come nel codice proposto.

L’idea chiave è:

partiamo dall’ultima cifra dell’array (la meno significativa)
inizializziamo un riporto (carry) a 1, perché dobbiamo aggiungere uno
sommiamo il valore corrente con il riporto
se il risultato è maggiore o uguale a 10, manteniamo il riporto e inseriamo la cifra risultante (value % 10)
altrimenti azzeriamo il riporto e inseriamo direttamente il valore
continuiamo verso sinistra fino a esaurire tutte le cifre
se alla fine rimane un riporto, lo aggiungiamo in testa all’array

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza dell’array, ed è efficiente perché evita conversioni in numeri interi, lavorando direttamente sulle cifre.

```typescript
function plusOne(digits: number[]): number[] {
    let rest: number = 1;
    let i:number = digits.length-1;
    let sumNumber: number[] = [];

    do{
        let valueNumber: number = digits[i]+rest;
        rest = 0;
        if(valueNumber >= 10){
            rest = 1;   
            sumNumber.unshift(valueNumber-10)
        } else{
            sumNumber.unshift(valueNumber)
        }
        i--;
    }while(i >= 0)
    
    if(rest)
        sumNumber.unshift(1)

    return sumNumber
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)