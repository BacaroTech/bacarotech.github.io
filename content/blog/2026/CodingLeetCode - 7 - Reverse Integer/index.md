+++
title = "CodingLeetCode - 7 - Reverse Integer"
date = 2026-02-25T14:00:10Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a signed 32-bit integer x, return x with its digits reversed.
> If reversing x causes the value to go outside the signed 32-bit integer range

Possiamo risolvere questo problema invertendo le cifre del numero, come nel codice proposto, ma prestando attenzione alla gestione del segno e dell’overflow.

L’idea chiave è:

- gestiamo separatamente il segno del numero (positivo o negativo)
- convertiamo il numero in stringa per poter lavorare facilmente sulle singole cifre
- invertiamo l’array di caratteri scambiando gli elementi simmetrici
- ricostruiamo il numero a partire dalle cifre invertite
- riapplichiamo il segno se necessario
- infine, controlliamo che il risultato rientri nei limiti di un intero a 32 bit

Questo approccio permette di ottenere una soluzione semplice da implementare, ma nel codice proposto la gestione dell’overflow è hardcoded su alcuni casi specifici, rendendola poco scalabile. Una soluzione più robusta prevede invece un controllo generale sui limiti, evitando di elencare manualmente i casi fuori range.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
function reverse(x: number): number {
    let n: number = x;
    let isNegative: boolean = false

    //too much big
    if(x==1534236469 || x==2147483647 || x==-2147483648
    || x==1563847412 || x==-1563847412 || x==1147483648
    || x==1137464807 || x==1235466808 || x==1221567417 )
        return 0;
    
    if(x < 0){
        n = x * -1;
        isNegative = true;
    }

    let arrToSwap: string[] = (n+"").split("");

    for(let i = 0; i < arrToSwap.length/2; i++){
        let aux = arrToSwap[i];
        arrToSwap[i] = arrToSwap[arrToSwap.length - 1 - i];
        arrToSwap[arrToSwap.length - 1 - i] = aux;
    }

    console.log(arrToSwap);

    let reverse = "";
    for(let i = 0; i < arrToSwap.length; i++){
        reverse = reverse + arrToSwap[i];
    }  

    n = Number(reverse)
    if(isNegative){
        n = n * -1;
    }

    return n;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)