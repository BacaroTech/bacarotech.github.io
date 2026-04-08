+++
title = "CodingLeetCode - 58 - Length of Last Word"
date = 2026-02-25T14:00:18Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a string s consisting of words and spaces, return the length of the last word in the string.
> A word is a maximal substring consisting of non-space characters only.

Possiamo risolvere questo problema analizzando la stringa e individuando l’ultima parola valida, come nel codice proposto.

L’idea chiave è:

- dividiamo la stringa utilizzando lo spazio come separatore
- otteniamo così un array di possibili parole (inclusi eventuali elementi vuoti)
- scorriamo l’array a ritroso, partendo dall’ultima posizione
- ignoriamo le stringhe vuote causate da spazi multipli o finali
- appena troviamo una parola valida, ne restituiamo la lunghezza
- se non troviamo parole, restituiamo un valore di fallback

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza della stringa, ed è semplice da implementare. Tuttavia, crea una struttura ausiliaria (l’array) che può essere evitata scorrendo direttamente la stringa da destra verso sinistra.

```typescript
function lengthOfLastWord(s: string): number {
    let strings: string[] = s.split(" ");
    console.log(strings);
    for(let i = strings.length - 1; i >= 0; i--){
        if(!(strings[i].length == 0)){
            console.log(strings[i]);
            return strings[i].length;
        }
    }
    return -1;
};

```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)