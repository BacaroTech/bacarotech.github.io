+++
title = "CodingLeetCode - 1 - Two Sum"
date = 2026-02-25T14:00:08Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

## sol.ts

```typescript
function twoSum(nums: number[], target: number): number[] {
    let mapOfCipher: Map<number, number[]> = new Map<number, number[]>();
    let i = 0;
    nums.forEach((num: number) => {
        if(!mapOfCipher.get(num)){
            mapOfCipher.set(num, [i]);
        }else{
            let arr: number[] = mapOfCipher.get(num);
            arr.push(i)
            mapOfCipher.set(num, arr);
        }
        i++
    });
    console.log(mapOfCipher);

    let couple: number[] = [];

    nums.forEach((num: number) => {
        let sub = target - num;
        if(couple.length == 0 && mapOfCipher.get(sub)){
            if(sub == num && mapOfCipher.get(sub).length >= 2){
                couple = mapOfCipher.get(sub);
            }else if(sub == num && mapOfCipher.get(sub).length == 1){
                console.log('nop')
            }else{
                couple =  mapOfCipher.get(num).concat(mapOfCipher.get(sub));
            }
        }
    });

    return couple
}
```

