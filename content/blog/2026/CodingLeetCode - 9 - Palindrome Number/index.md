+++
title = "CodingLeetCode - 9 - Palindrome Number"
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
function isPalindrome(x: number): boolean {
    if(x < 0){
        return false;
    }else{
        let digits = x.toString().split('');
        let digitsArray = digits.map(Number)
        let checked = true;
        for(let i = 0; i < digitsArray.length; i++){
            if(digitsArray[i] != digitsArray[digitsArray.length - 1 - i]){
                checked = false;
            }
        }
        return checked;
    }
};
```

