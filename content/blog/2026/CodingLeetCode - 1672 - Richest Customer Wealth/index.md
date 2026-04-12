+++
title = "CodingLeetCode - 1672 - Richest Customer Wealth"
date = 2026-02-25T14:00:39Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the i-th customer has in the j-th bank.
> Return the wealth that the richest customer has.

Possiamo risolvere questo problema calcolando la somma di ogni riga della matrice, come nel codice proposto.

L’idea chiave è:

- ogni riga dell’array rappresenta un cliente
- ogni elemento della riga rappresenta il denaro in una banca
- per ogni cliente, calcoliamo la somma di tutti i suoi conti
- confrontiamo la somma ottenuta con il massimo attuale
- se la somma è maggiore, aggiorniamo il massimo
- alla fine restituiamo il valore massimo trovato

Questo approccio permette di ottenere una complessità O(m × n), dove m è il numero di clienti e n il numero di conti per cliente. È una soluzione semplice e diretta, che scorre la matrice una sola volta senza strutture dati aggiuntive

```typescript
function maximumWealth(accounts: number[][]): number {
    let max = 0;
    accounts.forEach((row: number[]) => {
        let sum = 0;
        row.forEach((coll: number) => {
            sum += coll
        })  
        if(sum > max)
            max = sum;
    })
    return max;
};
```

