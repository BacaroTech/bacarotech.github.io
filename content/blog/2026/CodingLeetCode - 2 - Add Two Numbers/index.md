+++
title = "CodingLeetCode - 2 - Add Two Numbers"
date = 2026-02-25T14:00:09Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes > contains a single digit. Add the two numbers and return the sum as a linked list.

Possiamo analizzare questo problema partendo da un approccio in due fasi, come nel codice proposto, in cui utilizziamo una struttura dati per memorizzare le informazioni utili durante l’elaborazione.

L’idea chiave è:

- prima scorriamo l’array per costruire una mappa che associa ogni numero agli indici in cui compare
- questo ci permette di gestire anche il caso di numeri duplicati
- successivamente, per ogni numero num, calcoliamo il complemento target - num
- verifichiamo se il complemento è presente nella mappa
- gestiamo separatamente il caso in cui num e il complemento coincidano (servono almeno due occorrenze)
- se troviamo una corrispondenza, restituiamo gli indici

Questo approccio permette di ottenere una complessità O(n), ma introduce una gestione più complessa dei casi rispetto alla soluzione ottimale, poiché mantiene tutti gli indici e richiede un secondo passaggio sull’array.

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

Oggi vediamo il seguente esercizio di LeetCode:

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let sumL: Array<number> = new Array<number>();
    let first: Array<number> = new Array<number>();
    let second: Array<number> = new Array<number>();
    let rest: number = 0;

    while(l1){
        first.push(l1.val);
        l1 = l1.next;
    }

    while(l2){
        second.push(l2.val);
        l2 = l2.next;
    }

    if(first.length < second.length){
        for(let i = first.length; i < second.length; i++)
            first.push(0);
    }else{
        for(let i = second.length; i < first.length; i++)
            second.push(0);
    }
    
    console.log(first, second);

    for(let i = 0; i < first.length; i++){
        let sum = first[i] + second[i] + rest;
        if(sum >= 10){
            sumL.push(sum - 10);
            rest = 1;
        }else{
            sumL.push(sum);
            rest = 0;
        }
    }

    if(rest == 1)
        sumL.push(1);

    return buildList(sumL, 0);
};

function buildList(sumL: number[], pos: number): ListNode | null{
    if(pos == sumL.length)
        return null;
    return new ListNode(sumL[pos], buildList(sumL, pos+1));
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)

