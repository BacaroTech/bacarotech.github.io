+++
title = "CodingLeetCode - 20 - Valid Parentheses"
date = 2026-02-25T14:00:14Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
> An input string is valid if:
> Open brackets must be closed by the same type of brackets.
> Open brackets must be closed in the correct order.

Possiamo risolvere questo problema utilizzando una struttura dati che segue il principio LIFO (Last In, First Out), come nel codice proposto.

L’idea chiave è:

- scartiamo subito le stringhe con lunghezza dispari, perché non possono essere bilanciate
- utilizziamo uno stack (array) per tenere traccia delle parentesi aperte
- scorriamo la stringa carattere per carattere
- se troviamo una parentesi aperta, la inseriamo nello stack
- se troviamo una parentesi chiusa, controlliamo che corrisponda all’ultima aperta (top dello stack)
- se non corrisponde, la stringa non è valida
- se corrisponde, rimuoviamo l’elemento dallo stack
- alla fine, la stringa è valida solo se lo stack è vuoto

Questo approccio permette di ottenere una complessità O(n), dove n è la lunghezza della stringa, ed è ottimale per questo tipo di problema. Inoltre, l’uso dello stack garantisce automaticamente il rispetto dell’ordine corretto delle parentesi.

```typescript
function isValid(s: string): boolean {
    if(s.length % 2 != 0){
        return false;
    }else{
        let myPila = [];
        for(let i = 0; i < s.length; i++){
            let c : string = s[i];
            if(c == '(' || c == '[' || c == '{'){
                myPila.push(c)
            }else{
                if(
                    c == ')' && myPila[myPila.length - 1] != '(' ||
                    c == ']' && myPila[myPila.length - 1] != '[' ||
                    c == '}' && myPila[myPila.length - 1] != '{'     
                ){
                    console.log(myPila[myPila.length - 1])
                    return false;
                }else{
                    myPila.pop();
                }
            }
        }
        console.log(myPila)
        if(myPila.length == 0){
            return true
        }else{
            return false
        }
    }
};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)
