+++
title = "CodingLeetCode - 70 - Climbing Stairs"
date = 2026-02-25T14:00:20Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are climbing a staircase. It takes n steps to reach the top.
> Each time you can either climb 1 or 2 steps.
> In how many distinct ways can you climb to the top?

Possiamo risolvere questo problema osservando che il numero di modi per arrivare a uno scalino dipende da quelli precedenti, come nel codice proposto.

L’idea chiave è:

- per arrivare allo scalino n possiamo provenire da n-1 (facendo 1 passo) oppure da n-2 (facendo 2 passi)
- quindi il numero di modi per arrivare a n è la somma dei modi per arrivare a n-1 e n-2
- gestiamo i casi base: per 0 e 1 c’è un solo modo
- utilizziamo due variabili per tenere traccia dei risultati precedenti
- ad ogni iterazione aggiorniamo i valori sommando i due precedenti
- continuiamo fino a raggiungere n

Questo approccio permette di ottenere una complessità O(n) e spazio O(1), ed è equivalente al calcolo della successione di Fibonacci, evitando l’uso della ricorsione che sarebbe meno efficiente.

```typescript
function climbStairs(n: number): number {
    //return climbStairsRec(n, 1) + climbStairsRec(n, 2);
    
    if (n == 0 || n == 1) {
        return 1;
    }
    let prev = 1, curr = 1;
    for (let i = 2; i <= n; i++) {
        let temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    return curr;
    
};

/*
TO MUCH TIME!
function climbStairsRec(n: number, step: number): number {
    if(n < step || n == 0){
        return 0;
    }else{
        if(n-step == 0){
            return 1;
        }else{
            let one: number = 0;
            let two: number = 0;
            if(n-step >= 1)
                one = climbStairsRec(n-step, 1)
            if(n-step >= 2)
                two = climbStairsRec(n-step, 2); 
            return one+ two;
        }
    }
}*/
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)