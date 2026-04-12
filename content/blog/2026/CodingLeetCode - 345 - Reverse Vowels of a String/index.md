+++
title = "CodingLeetCode - 345 - Reverse Vowels of a String"
date = 2026-02-25T14:00:32Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a string s, reverse only all the vowels in the string and return it.

Possiamo risolvere questo problema raccogliendo prima le vocali e poi reinserendole in ordine inverso, come nel codice proposto.

L’idea chiave è:

- scorriamo la stringa da destra verso sinistra e salviamo tutte le vocali in un array
- in questo modo otteniamo già le vocali in ordine inverso
- scorriamo nuovamente la stringa da sinistra verso destra
- ogni volta che incontriamo una vocale, la sostituiamo con quella successiva nell’array delle vocali invertite
- utilizziamo una funzione di supporto per sostituire il carattere nella posizione corretta
- continuiamo fino a ricostruire tutta la stringa

Questo approccio permette di ottenere una complessità O(n), ma utilizza memoria aggiuntiva e operazioni di slicing che creano nuove stringhe. Una soluzione più ottimale utilizza due puntatori (uno all’inizio e uno alla fine) e scambia direttamente le vocali senza creare strutture ausiliarie.

```typescript
function reverseVowels(s: string): string {
    let vocalsReverse: string[] = [];
    for(let i = s.length-1; i >= 0; i--){
        if(isVocal(s[i]))
            vocalsReverse.push(s[i])
    }
    let j: number = 0;
    for(let i = 0; i < s.length; i++){
        if(isVocal(s[i])){
            s = replaceCharacter(s,i, vocalsReverse[j]);
            j++
        }
    }
    return s;
};

function isVocal(c: string): boolean{
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
    || c == 'A' || c == 'E'|| c == 'I'|| c == 'O'|| c == 'U';
}

function replaceCharacter(string, index, replacement) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)