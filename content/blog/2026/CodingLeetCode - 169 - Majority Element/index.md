+++
title = "CodingLeetCode - 169 - Majority Element"
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
function majorityElement(nums: number[]): number {
    let mapRep: Map<number, number> = new Map<number, number>();
    
    nums.forEach(num => {
        if(mapRep.get(num)){
            mapRep.set(num, mapRep.get(num)+1);
        }else{
            mapRep.set(num,1)
        }
    });

    let arrayKeys: number[] = Array.from(mapRep.keys());
    let majorNum: number = -1;

    arrayKeys.forEach(key => {
        if(mapRep.get(key) > nums.length/2){
            majorNum = key;
        }
    });

    return majorNum;

};
```

