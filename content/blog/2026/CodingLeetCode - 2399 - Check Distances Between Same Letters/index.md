+++
title = "CodingLeetCode - 2399 - Check Distances Between Same Letters"
date = 2026-02-25T14:00:41Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'python', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given a string s consisting of lowercase English letters and an integer array distance of length 26.
> For every letter from 'a' to 'z', if it appears twice in s, the distance between its two occurrences must be equal to distance[i].
> Return true if all distances match, otherwise return false.

Possiamo risolvere questo problema calcolando la distanza tra le due occorrenze di ogni carattere, come nei due codici proposti.

L’idea chiave è:

- per ogni lettera dell’alfabeto dobbiamo trovare le sue due posizioni nella stringa
- la distanza tra queste due occorrenze deve essere uguale a quella fornita nell’array distance
- se una lettera appare una sola volta, la ignoriamo
- se appare due volte, controlliamo che la differenza tra gli indici sia corretta
- se tutte le lettere rispettano la condizione, restituiamo true, altrimenti false

Nel primo approccio (TypeScript):

- utilizziamo una mappa per memorizzare la prima occorrenza di ogni lettera
- quando la incontriamo di nuovo, calcoliamo la distanza tra le due posizioni
- confrontiamo il risultato con il valore atteso in distance
- infine verifichiamo tutti i caratteri dell’alfabeto

semplice e diretto
richiede gestione esplicita delle lettere e conversione ASCII

Nel secondo approccio (Python):

- utilizziamo un array di dimensione 26 per rappresentare le lettere dell’alfabeto
- scansioniamo la stringa da destra verso sinistra
- alla prima occorrenza memorizziamo l’indice
- alla seconda occorrenza calcoliamo direttamente la distanza
- confrontiamo infine tutti i risultati con distance

più compatto e leggermente più efficiente
evita strutture dinamiche come Map

```typescript
function checkDistances(s: string, distance: number[]): boolean {
    let checked = true;

    let map = new Map();
    for(let i = 0; i < s.length; i++){
        if(map.get(s[i]) == undefined){
            map.set(s[i], i);
        }else{
            let lastindex = map.get(s[i])
            map.set(s[i], i - lastindex - 1);
        }
    }

    for(let i = 0; i < distance.length; i++){
        //a->97
        let value = map.get(String.fromCharCode(97+i))
        if(value != undefined && value != distance[i]){
            checked = false;
        }
        
    }

    return checked;
};
```

```python
class Solution(object):

    def checkDistances(self, s, distance):
        counters = [-1]*26

        for idx in range(len(s))[::-1]:
            letter_position = ord(s[idx])-ord('a')
            current_count = counters[letter_position]
            if current_count == -1:
                counters[letter_position] = idx
            else:
                counters[letter_position] -= (idx + 1)

        for idx in range(len(counters)):
            if counters[idx] != -1 and counters[idx] != distance[idx]:
                return False

        return True
```

