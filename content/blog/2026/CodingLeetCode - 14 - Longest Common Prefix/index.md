+++
title = "CodingLeetCode - 14 - Longest Common Prefix"
date = 2026-02-25T14:00:13Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Write a function to find the longest common prefix string amongst an array of strings.
> If there is no common prefix, return an empty string "".

Possiamo risolvere questo problema confrontando i caratteri delle stringhe posizione per posizione, come nel codice proposto.

L’idea chiave è:
- prendiamo la prima stringa come riferimento
- scorriamo i suoi caratteri uno alla volta
- ad ogni iterazione aggiungiamo il carattere corrente al prefisso comune
- verifichiamo che tutte le altre stringhe abbiano lo stesso carattere in quella posizione
- se una stringa è più corta oppure il carattere non coincide, rimuoviamo l’ultimo carattere aggiunto e interrompiamo il ciclo
- continuiamo finché tutti i controlli sono soddisfatti

Questo approccio permette di ottenere una complessità O(n * m), dove n è il numero di stringhe e m è la lunghezza del prefisso comune. È una soluzione semplice e leggibile, anche se può essere leggermente ottimizzata interrompendo subito il ciclo interno appena si trova una discordanza.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
function longestCommonPrefix(strs: string[]): string {
    let common : string = "";
    let i : number = 0;

    let end: boolean = false;

    while(i < strs[0].length && !end){
        let remove: boolean = false;
        common += strs[0][i];
        for(let j = 0; j < strs.length; j++){
            if(i >= strs[j].length || strs[j][i] != common[i]){
                remove=true
            }
        }
        if(remove){
            common = common.slice(0, -1);
            end = true;
        }
        i++;
    }

    return common;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)