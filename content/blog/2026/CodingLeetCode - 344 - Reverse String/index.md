+++
title = "CodingLeetCode - 344 - Reverse String"
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
function reverseString(s: string[]): void {
    let aux: string;
    for(let i = 0; i < s.length/2; i++){
        aux = s[i];
        s[i] = s[s.length - 1 - i];
        s[s.length - 1 - i] = aux;
    }
};
```

