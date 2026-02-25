+++
title = "CodingLeetCode - 1672 - Richest Customer Wealth"
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
function maximumWealth(accounts: number[][]): number {
    let max = 0;
    accounts.forEach((row: number[]) => {
        let sum = 0;
        row.forEach((coll: number) => {
            sum += coll
        })  
        if(sum > max)
            max = sum;
    })
    return max;
};
```

