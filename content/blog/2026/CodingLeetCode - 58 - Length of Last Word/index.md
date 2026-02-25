+++
title = "CodingLeetCode - 58 - Length of Last Word"
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
function lengthOfLastWord(s: string): number {
    let strings: string[] = s.split(" ");
    console.log(strings);
    for(let i = strings.length - 1; i >= 0; i--){
        if(!(strings[i].length == 0)){
            console.log(strings[i]);
            return strings[i].length;
        }
    }
    return -1;
};

```

