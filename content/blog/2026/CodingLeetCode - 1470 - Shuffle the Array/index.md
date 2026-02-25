+++
title = "CodingLeetCode - 1470 - Shuffle the Array"
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
function shuffle(nums: number[], n: number): number[] {
    let numsShuffle: number[] = [];
    let halfSize = nums.length / 2;

    for(let i = 0; i < n; i++){
        numsShuffle.push(nums[i]);
        numsShuffle.push(nums[i + halfSize]);
    }
    
    return numsShuffle;
};
```

