+++
title = "CodingLeetCode - 9 - Palindrome Number"
date = 2026-02-25T14:00:11Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given an integer x, return true if x is a palindrome, and false otherwise.

Possiamo risolvere questo problema confrontando le cifre del numero da entrambi i lati, proprio come fatto nel codice proposto.

L’idea chiave è:
- escludiamo subito i numeri negativi, perché non possono essere palindromi
- convertiamo il numero in stringa per poter accedere facilmente alle singole cifre
- trasformiamo la stringa in un array di cifre
- confrontiamo gli elementi simmetrici: il primo con l’ultimo, il secondo con il penultimo, e così via
- se troviamo anche una sola differenza, il numero non è palindromo
- se tutti i confronti vanno a buon fine, il numero è palindromo

Questo approccio permette di ottenere una complessità O(n), dove n è il numero di cifre, ed è semplice da implementare. Tuttavia, il ciclo potrebbe essere ottimizzato fermandosi a metà dell’array, evitando confronti ridondanti.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
function isPalindrome(x: number): boolean {
    if(x < 0){
        return false;
    }else{
        let digits = x.toString().split('');
        let digitsArray = digits.map(Number)
        let checked = true;
        for(let i = 0; i < digitsArray.length; i++){
            if(digitsArray[i] != digitsArray[digitsArray.length - 1 - i]){
                checked = false;
            }
        }
        return checked;
    }
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)