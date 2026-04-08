+++
title = "CodingLeetCode - 86 - Partition List"
date = 2026-02-25T14:00:21Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
> You should preserve the original relative order of the nodes in each of the two partitions.

Possiamo risolvere questo problema separando i valori in due gruppi distinti e poi ricombinandoli, come nel codice proposto.

L’idea chiave è:

- scorriamo la linked list una prima volta
- per ogni nodo, separiamo i valori in due array:
- uno per i valori minori di x
- uno per i valori maggiori o uguali a x
- in questo modo manteniamo anche l’ordine relativo degli elementi
- una volta terminata la scansione, concateniamo i due array
- infine, ricostruiamo la linked list a partire dall’array risultante

Questo approccio permette di ottenere una complessità O(n), dove n è il numero di nodi, ed è semplice da implementare. Tuttavia, utilizza memoria aggiuntiva per gli array e ricostruisce completamente la lista, mentre una soluzione più ottimale collega direttamente i nodi originali senza strutture ausiliarie.

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

function partition(head: ListNode | null, x: number): ListNode | null {
    let auxHead: ListNode | null = head;
    

    let minusValues: number[] = [];
    let greatValues: number[] = [];

    auxHead = head;
    while(auxHead != null){
        if(auxHead.val < x){
            minusValues.push(auxHead.val);
        }else{
            greatValues.push(auxHead.val);
        }
        auxHead = auxHead.next;
    }
    console.log(minusValues, [x], greatValues);
    minusValues = minusValues.concat(greatValues)
    console.log(minusValues);

    return buildList(minusValues, 0);
};

function buildList(list: number[], position: number) : ListNode | null {
    if(position < list.length)
        return new ListNode(list[position], buildList(list, position+1))
    return null;
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)