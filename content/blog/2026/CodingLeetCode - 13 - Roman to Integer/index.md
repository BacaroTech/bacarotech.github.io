+++
title = "CodingLeetCode - 13 - Roman to Integer"
date = 2026-02-25T14:00:12Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a roman numeral, convert it to an integer.

Possiamo risolvere questo problema scorrendo la stringa e gestendo separatamente i casi “standard” e quelli in cui una cifra più piccola precede una più grande (notazione sottrattiva), come nel codice proposto.

L’idea chiave è:

- utilizziamo una mappa per associare ogni simbolo romano al suo valore numerico
- scorriamo la stringa carattere per carattere
- per ogni simbolo, controlliamo se forma una coppia speciale (IV, IX, XL, XC, CD, CM)
- se sì, sottraiamo il valore corrente da quello successivo e saltiamo il prossimo carattere
- altrimenti, sommiamo semplicemente il valore del simbolo corrente
- continuiamo fino alla fine della stringa

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza della stringa, ed è efficace nel gestire correttamente tutti i casi. Tuttavia, nel codice proposto la gestione delle coppie speciali è suddivisa in più funzioni (checkI, checkX, checkC), rendendo la soluzione più verbosa: può essere semplificata confrontando direttamente il valore corrente con quello successivo in un unico passaggio.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
function romanToInt(s: string): number {
    let mapRomanToInteger: Map<string, number> = new Map<string, number>();
    mapRomanToInteger.set('I', 1);
    mapRomanToInteger.set('V', 5);
    mapRomanToInteger.set('X', 10);
    mapRomanToInteger.set('L', 50);
    mapRomanToInteger.set('C', 100);
    mapRomanToInteger.set('D', 500);
    mapRomanToInteger.set('M', 1000);
    let sum = 0;

    for(let i = 0; i < s.length; i++){
        if(checkI(s, i) || checkX(s, i) || checkC(s, i)){
            sum += mapRomanToInteger.get(s[i+1]) - mapRomanToInteger.get(s[i]);
            i++;
        }
        else
           sum += mapRomanToInteger.get(s[i]); 
        console.log(sum)
    }

    return sum;
};

function checkI(s: string, i: number): boolean{
   return s[i] == 'I' && i+1 < s.length && (s[i+1] == 'V' || s[i+1] == 'X');
}

function checkX(s: string, i: number): boolean{
   return s[i] == 'X' && i+1 < s.length && (s[i+1] == 'L' || s[i+1] == 'C');
}

function checkC(s: string, i: number): boolean{
   return s[i] == 'C' && i+1 < s.length && (s[i+1] == 'D' || s[i+1] == 'M');
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)