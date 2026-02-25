+++
title = "CodingLeetCode - 239 - Sliding Window Maximum"
date = 2026-02-25T14:00:28Z
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
function maxSlidingWindow(nums: number[], k: number): number[] {
    let numsMax: number[] = [];
    
    for(let i = 0; i < nums.length-k+1; i++){
        let max = nums[i];
        for(let j = i; j < i+k; j++){
            if(nums[j] > max){
                max = nums[j];
            }
        }
        numsMax.push(max);
    }

    return numsMax;
}

/*function maxSlidingWindow(nums: number[], k: number): number[] {
    let numsMax: number[] = [];
    let mapKPosition: Map<number, number[]> = new Map<number, number[]>();
    
    for(let i = 0; i < nums.length-k+1; i++){
        for(let j = i; j < i+k; j++){
            if(!mapKPosition.get(i)){
                mapKPosition.set(i, [nums[j]]);
            }else{
                let arrToModify: number[] = mapKPosition.get(i);
                arrToModify.push(nums[j]);
                mapKPosition.set(i, arrToModify);
            }
        }
    }

    console.log(mapKPosition);

    let keysArr: number[] = Array.from(mapKPosition.keys());

    for(let i = 0; i < keysArr.length; i++){
        numsMax.push(Math.max(...mapKPosition.get(i)));
    }

    return numsMax;
};*/
```

