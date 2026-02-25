+++
title = "CodingLeetCode - 2798 - Number of Employees Who Met the Target"
date = 2026-02-25T14:00:42Z
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
function numberOfEmployeesWhoMetTarget(hours: number[], target: number): number {
    let count = 0;
    for(let i = 0; i < hours.length; i++){
        if(hours[i] >= target){
            count++;
        }
    }
    return count;
};
```

