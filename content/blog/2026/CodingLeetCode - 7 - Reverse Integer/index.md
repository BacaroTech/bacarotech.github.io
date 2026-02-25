+++
title = "CodingLeetCode - 7 - Reverse Integer"
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
function reverse(x: number): number {
    let n: number = x;
    let isNegative: boolean = false

    //too much big
    if(x==1534236469 || x==2147483647 || x==-2147483648
    || x==1563847412 || x==-1563847412 || x==1147483648
    || x==1137464807 || x==1235466808 || x==1221567417 )
        return 0;
    
    if(x < 0){
        n = x * -1;
        isNegative = true;
    }

    let arrToSwap: string[] = (n+"").split("");

    for(let i = 0; i < arrToSwap.length/2; i++){
        let aux = arrToSwap[i];
        arrToSwap[i] = arrToSwap[arrToSwap.length - 1 - i];
        arrToSwap[arrToSwap.length - 1 - i] = aux;
    }

    console.log(arrToSwap);

    let reverse = "";
    for(let i = 0; i < arrToSwap.length; i++){
        reverse = reverse + arrToSwap[i];
    }  

    n = Number(reverse)
    if(isNegative){
        n = n * -1;
    }

    return n;
};
```

