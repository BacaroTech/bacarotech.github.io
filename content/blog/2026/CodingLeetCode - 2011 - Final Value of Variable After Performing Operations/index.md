+++
title = "CodingLeetCode - 2011 - Final Value of Variable After Performing Operations"
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
function finalValueAfterOperations(operations: string[]): number {
    let value = 0;
    operations.forEach((operation: string ) => {
        if(operation == "X++" || operation == "++X"){
            value++;
        }else{
            value--;
        }
    })
    return value;

};
```

