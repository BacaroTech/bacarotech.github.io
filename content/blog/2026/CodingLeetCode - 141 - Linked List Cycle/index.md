+++
title = "CodingLeetCode - 141 - Linked List Cycle"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

## sol1.ts

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

