+++
title = "CodingLeetCode - 242 - Valid Anagram"
date = 2026-02-25T14:00:29Z
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
function isAnagram(s: string, t: string): boolean {
    
    if(s.length != t.length){
        return false;
    }else{
        let sArray = s.split('');
        let tArray = t.split('');
        sArray.sort();
        tArray.sort();
        for(let i = 0; i < sArray.length; i++ ){
            if (sArray[i] != tArray[i]){
                return false;
            }
        }
        return true;
    }

};

```

