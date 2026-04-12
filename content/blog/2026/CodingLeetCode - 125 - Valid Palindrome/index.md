+++
title = "CodingLeetCode - 125 - Valid Palindrome"
date = 2026-02-25T14:00:24Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.
> Given a string s, return true if it is a palindrome, or false otherwise.

Possiamo risolvere questo problema normalizzando prima la stringa e poi confrontandola simmetricamente, come nel codice proposto.

L’idea chiave è:

- scorriamo la stringa e costruiamo una nuova stringa contenente solo caratteri alfanumerici
- convertiamo tutti i caratteri in minuscolo per evitare problemi di confronto
- confrontiamo i caratteri agli estremi: il primo con l’ultimo, il secondo con il penultimo, e così via
- se troviamo una differenza, la stringa non è palindroma
- se tutti i confronti vanno a buon fine, la stringa è palindroma
- gestiamo come casi validi anche stringhe vuote o con un solo carattere

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza della stringa, ed è efficace perché filtra prima i caratteri non validi e poi applica un semplice confronto simmetrico. Una possibile ottimizzazione consiste nell’evitare la creazione di una nuova stringa e lavorare direttamente con due puntatori sulla stringa originale.

```typescript
function isPalindrome(s: string): boolean {
    let strCompact = "";
    for(let i = 0; i < s.length; i++){
        if((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')){
            strCompact += s[i];
        }
    }

    strCompact = strCompact.toLowerCase();
    console.log(strCompact);

    let result = true;

    for(let i = 0; i < strCompact.length/2; i++){
        if(strCompact[i] != strCompact[strCompact.length - 1 - i]){
            result = false;
        }
    }

    console.log(strCompact);
    if(strCompact.length == 1 || strCompact.length == 0){
        result = true;
    }

    return result;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)