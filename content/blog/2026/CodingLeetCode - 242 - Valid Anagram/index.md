+++
title = "CodingLeetCode - 242 - Valid Anagram"
date = 2026-02-25T14:00:29Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Possiamo risolvere questo problema confrontando le versioni ordinate delle due stringhe, come nel codice proposto.

L’idea chiave è:

- controlliamo subito se le due stringhe hanno lunghezze diverse
- se sì, non possono essere anagrammi
- convertiamo entrambe le stringhe in array di caratteri
- ordiniamo i due array
- confrontiamo i caratteri posizione per posizione
- se troviamo una differenza, le stringhe non sono anagrammi
- se tutti i caratteri coincidono, allora sono anagrammi

Questo approccio permette di ottenere una complessità O(n log n) a causa dell’ordinamento. È una soluzione semplice e intuitiva, anche se non la più efficiente: si può migliorare utilizzando una struttura di conteggio delle frequenze per raggiungere una complessità O(n).

```typescript
function isAnagram(s: string, t: string): boolean {
    
    if(s.length != t.length){
        return false;
    }else{
        let sArray = s.split('');
        let tArray = t.split('');
        sArray.sort();
        tArray.sort();
        for(let i = 0; i < sArray.length; i++ ){
            if (sArray[i] != tArray[i]){
                return false;
            }
        }
        return true;
    }

};

```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)