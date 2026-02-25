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

## sol1.ts

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

