+++
title = "CodingLeetCode - 1431 - Kids With the Greatest Number of Candies"
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
function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let maxCandies: number = Math.max(...candies);
    let resultesCandies: boolean[] = [];
    candies.forEach(candiesForChild => {
        if(candiesForChild + extraCandies >= maxCandies){
            resultesCandies.push(true);
        }else{
            resultesCandies.push(false);
        }
    })
    return resultesCandies;
    
};
```

