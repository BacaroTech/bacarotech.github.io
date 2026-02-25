+++
title = "CodingLeetCode - 27 - Remove Element"
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
function removeElement(nums: number[], val: number): number {
    let i: number = 0;
   
    while(i < nums.length){
        if(nums[i] == val){
            nums.splice(i, 1);
        }else{
            i++;
        }
    }
    return nums.length;
};
```

