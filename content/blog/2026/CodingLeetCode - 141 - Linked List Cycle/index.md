+++
title = "CodingLeetCode - 141 - Linked List Cycle"
date = 2026-02-25T14:00:25Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:

> Given head, the head of a linked list, determine if the linked list has a cycle in it.
> There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.

Possiamo risolvere questo problema tenendo traccia dei nodi già visitati durante la scansione, come nel codice proposto.

L’idea chiave è:

- scorriamo la linked list nodo per nodo
- utilizziamo una struttura dati (in questo caso una mappa) per memorizzare i nodi già visitati
- per ogni nodo, controlliamo se il nodo successivo è già stato visto
- se sì, significa che siamo entrati in un ciclo
- se no, salviamo il nodo e continuiamo la scansione
- se arriviamo alla fine (null), allora non esiste alcun ciclo

Questo approccio permette di ottenere una complessità O(n), ma utilizza memoria aggiuntiva per salvare i nodi visitati. Inoltre, nel codice proposto viene salvato head.next invece del nodo corrente, rendendo la logica meno chiara e potenzialmente soggetta a errori: è più corretto tracciare direttamente i nodi visitati. Una soluzione più ottimale utilizza due puntatori (lento e veloce) e lavora in O(1) spazio.

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

function hasCycle(head: ListNode | null): boolean {
    if(head == null || head.next == null)
        return false;

    let mapListPos: Map<ListNode | null , number> = new Map<ListNode , number>();

    while(head){
        if(mapListPos.get(head.next)){
            return true;
        }else{
            mapListPos.set(head.next, 1);
            head = head.next;
        }
    }

    return false;
    

};
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)