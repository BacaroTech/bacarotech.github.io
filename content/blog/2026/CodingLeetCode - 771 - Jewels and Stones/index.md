+++
title = "CodingLeetCode - 771 - Jewels and Stones"
date = 2026-02-25T14:00:34Z
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
function numJewelsInStones(jewels: string, stones: string): number {
    let mapJewels : Map<string, number> = new Map<string, number>();
    let sum: number = 0;
    for(let i = 0; i < jewels.length; i++){
        mapJewels.set(jewels[i], 0)
    }
    
    for(let i = 0; i < stones.length; i++){

        if(mapJewels.get(stones[i]) != undefined){
            mapJewels.set(stones[i], mapJewels.get(stones[i]) + 1)
        }
    }

    Array.from(mapJewels, ([name, value]) => ( value )).forEach(data => {
        sum += data;
    }); 

    return sum;
};
```

