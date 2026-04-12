+++
title = "CodingLeetCode - 2798 - Number of Employees Who Met the Target"
date = 2026-02-25T14:00:42Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given an array hours representing the working hours of employees and an integer target.
> Return the number of employees who worked at least target hours.

Possiamo risolvere questo problema contando semplicemente quanti valori soddisfano la condizione, come nel codice proposto.

L’idea chiave è:

- inizializziamo un contatore a 0
- scorriamo l’array hours elemento per elemento
- per ogni valore controlliamo se è maggiore o uguale al target
- se la condizione è vera, incrementiamo il contatore
- al termine restituiamo il numero totale di elementi validi

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza dell’array, ed è ottimale perché richiede una sola scansione senza strutture dati aggiuntive.

```typescript
function numberOfEmployeesWhoMetTarget(hours: number[], target: number): number {
    let count = 0;
    for(let i = 0; i < hours.length; i++){
        if(hours[i] >= target){
            count++;
        }
    }
    return count;
};
```

