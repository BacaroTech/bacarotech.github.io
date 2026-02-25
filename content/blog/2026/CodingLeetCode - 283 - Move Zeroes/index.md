+++
title = "CodingLeetCode - 283 - Move Zeroes"
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
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums: number[]): void {
    let zeroRemoved: number = 0;
    let i:number = 0;
    while(i < nums.length){
        if(nums[i] == 0){
            nums.splice(i, 1);
            zeroRemoved++;
        }else{
            i++;
        }
    }
    for(let i = 0; i < zeroRemoved; i++){
        nums.push(0);
    }
};
```

