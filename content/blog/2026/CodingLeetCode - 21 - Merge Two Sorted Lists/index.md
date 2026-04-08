+++
title = "CodingLeetCode - 21 - Merge Two Sorted Lists"
date = 2026-02-25T14:00:15Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> You are given the heads of two sorted linked lists list1 and list2.
> Merge the two lists into one sorted list.
> The list should be made by splicing together the nodes of the first two lists.
> Return the head of the merged linked list.

Possiamo risolvere questo problema confrontando gli elementi delle due liste e costruendo una nuova struttura ordinata, come nel codice proposto.

L’idea chiave è:

- scorriamo contemporaneamente le due liste nodo per nodo
- confrontiamo i valori correnti di list1 e list2
- inseriamo il valore minore in una struttura temporanea (in questo caso un array)
- avanziamo nella lista da cui abbiamo preso il valore
- una volta esaurita una delle due liste, aggiungiamo tutti gli elementi rimanenti dell’altra
- infine, ricostruiamo la linked list a partire dall’array risultante

Questo approccio permette di ottenere una complessità O(n + m), dove n e m sono le lunghezze delle due liste. Tuttavia, nel codice proposto viene utilizzata una struttura ausiliaria (array) e una funzione ricorsiva per ricostruire la lista, mentre la soluzione ottimale richiede di collegare direttamente i nodi esistenti senza usare memoria aggiuntiva.

```typescript
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
 

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let arrayMerged: number[] = [];

    while(list1 && list2){
        if(list1.val < list2.val ){
            arrayMerged.push(list1.val);
            list1 = list1.next;
        }else{
            arrayMerged.push(list2.val);
            list2 = list2.next;
        }
    }

    while(list1){
        arrayMerged.push(list1.val);
        list1 = list1.next;
    }

    while(list2){
        arrayMerged.push(list2.val);
        list2 = list2.next;
    }

    return buildList(arrayMerged, 0);
};

function buildList(A: number[], p: number){
    if(p==A.length)
        return null
    return new ListNode(A[p], buildList(A, p+1));
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)