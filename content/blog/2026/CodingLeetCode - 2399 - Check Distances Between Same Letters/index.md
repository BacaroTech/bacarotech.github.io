+++
title = "CodingLeetCode - 2399 - Check Distances Between Same Letters"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'python', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

## sol1.ts

```typescript
function checkDistances(s: string, distance: number[]): boolean {
    let checked = true;

    let map = new Map();
    for(let i = 0; i < s.length; i++){
        if(map.get(s[i]) == undefined){
            map.set(s[i], i);
        }else{
            let lastindex = map.get(s[i])
            map.set(s[i], i - lastindex - 1);
        }
    }

    for(let i = 0; i < distance.length; i++){
        //a->97
        let value = map.get(String.fromCharCode(97+i))
        if(value != undefined && value != distance[i]){
            checked = false;
        }
        
    }

    return checked;
};
```

## sol2.py

```python
class Solution(object):

    def checkDistances(self, s, distance):
        counters = [-1]*26

        for idx in range(len(s))[::-1]:
            letter_position = ord(s[idx])-ord('a')
            current_count = counters[letter_position]
            if current_count == -1:
                counters[letter_position] = idx
            else:
                counters[letter_position] -= (idx + 1)

        for idx in range(len(counters)):
            if counters[idx] != -1 and counters[idx] != distance[idx]:
                return False

        return True
```

