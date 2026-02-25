+++
title = "CodingLeetCode - 13 - Roman to Integer"
date = 2026-02-25T14:00:12Z
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
function romanToInt(s: string): number {
    let mapRomanToInteger: Map<string, number> = new Map<string, number>();
    mapRomanToInteger.set('I', 1);
    mapRomanToInteger.set('V', 5);
    mapRomanToInteger.set('X', 10);
    mapRomanToInteger.set('L', 50);
    mapRomanToInteger.set('C', 100);
    mapRomanToInteger.set('D', 500);
    mapRomanToInteger.set('M', 1000);
    let sum = 0;

    for(let i = 0; i < s.length; i++){
        if(checkI(s, i) || checkX(s, i) || checkC(s, i)){
            sum += mapRomanToInteger.get(s[i+1]) - mapRomanToInteger.get(s[i]);
            i++;
        }
        else
           sum += mapRomanToInteger.get(s[i]); 
        console.log(sum)
    }

    return sum;
};

function checkI(s: string, i: number): boolean{
   return s[i] == 'I' && i+1 < s.length && (s[i+1] == 'V' || s[i+1] == 'X');
}

function checkX(s: string, i: number): boolean{
   return s[i] == 'X' && i+1 < s.length && (s[i+1] == 'L' || s[i+1] == 'C');
}

function checkC(s: string, i: number): boolean{
   return s[i] == 'C' && i+1 < s.length && (s[i+1] == 'D' || s[i+1] == 'M');
}
```

