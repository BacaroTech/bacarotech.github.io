+++
title = "CodingLeetCode - 26 - Remove Duplicates from Sorted Array"
date = 2026-02-25T14:00:16Z
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
function removeDuplicates(nums: number[]): number {
    
    let i = 1;
    while(i < nums.length){
        console.log(nums[i], nums[i-1]);
        if(nums[i] == nums[i-1]){
            let x = nums.splice(i, 1);
            console.log(i, " remove this: ", x)
        }else{
            i++;
        }
    }

    return nums.length;
};


```

