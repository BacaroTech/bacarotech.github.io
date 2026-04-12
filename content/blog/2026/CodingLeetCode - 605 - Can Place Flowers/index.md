+++
title = "CodingLeetCode - 605 - Can Place Flowers"
date = 2026-02-25T14:00:33Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You have a long flowerbed in which some of the plots are planted, and some are not.
> However, flowers cannot be planted in adjacent plots.
> Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means planted, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule.

Possiamo risolvere questo problema controllando per ogni posizione se è possibile piantare un fiore, come nel codice proposto.

L’idea chiave è:

- scorriamo l’array posizione per posizione
- per ogni elemento uguale a 0, verifichiamo se anche i vicini (sinistra e destra) sono liberi
- gestiamo separatamente i casi ai bordi (prima e ultima posizione)
- utilizziamo una variabile per evitare di considerare posizioni adiacenti dopo aver piantato un fiore
- quando troviamo una posizione valida, incrementiamo il contatore
- se incontriamo un 1, resettiamo lo stato perché non possiamo piantare accanto
- alla fine confrontiamo il numero di posizioni valide trovate con n

Questo approccio permette di ottenere una complessità O(n), ma nel codice proposto la gestione dei casi è piuttosto complessa, con molte condizioni e variabili di stato. Una soluzione più semplice consiste nel controllare direttamente i vicini per ogni posizione e aggiornare l’array quando si pianta un fiore, evitando flag aggiuntivi e rendendo il codice più leggibile.

```typescript
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    let count: number = 0;
    let possibleExPosition: boolean = false;
    if(flowerbed.length == 1 && flowerbed[0] == 0 && n == 1){
        return true;
    }
    for(let i:number=0; i< flowerbed.length; i++){
        if(flowerbed[i] == 0){
            if(i-1 >= 0 && flowerbed[i-1] == 0){
                if(i+1 < flowerbed.length && flowerbed[i+1] == 0){
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                }
            }

            if(i == 0){
                if(i+1 < flowerbed.length && flowerbed[i+1] == 0){
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                    
                }
            }

            if(i == flowerbed.length-1){
                if(i-1 >= 0 && flowerbed[i-1] == 0){
                    console.log("here")
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                }
            }
        }else{
            possibleExPosition = false;
        }
    }
    console.log( count, n);
    return count >= n;
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)