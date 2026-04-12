+++
title = "CodingLeetCode - 2011 - Final Value of Variable After Performing Operations"
date = 2026-02-25T14:00:40Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> There is a programming language with only four operations: ++X, X++, --X, X--.
> Given an array of strings operations, return the final value of X after performing all the operations starting from X = 0.

Possiamo risolvere questo problema simulando direttamente l’esecuzione delle operazioni, come nel codice proposto.

L’idea chiave è:

- inizializziamo una variabile value a 0
- scorriamo l’array di operazioni una per una
- se l’operazione è incremento (++X o X++), aumentiamo il valore di 1
- altrimenti, per le operazioni di decremento (--X o X--), diminuiamo il valore di 1
- continuiamo fino alla fine dell’array
- restituiamo il valore finale

Questo approccio permette di ottenere una complessità O(n), dove n è il numero di operazioni, ed è efficiente perché simula direttamente il comportamento richiesto senza strutture dati aggiuntive o trasformazioni intermedie.

```typescript
function finalValueAfterOperations(operations: string[]): number {
    let value = 0;
    operations.forEach((operation: string ) => {
        if(operation == "X++" || operation == "++X"){
            value++;
        }else{
            value--;
        }
    })
    return value;

};
```

