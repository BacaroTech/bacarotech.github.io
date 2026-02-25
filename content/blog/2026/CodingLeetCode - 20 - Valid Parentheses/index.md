+++
title = "CodingLeetCode - 20 - Valid Parentheses"
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
function isValid(s: string): boolean {
    if(s.length % 2 != 0){
        return false;
    }else{
        let myPila = [];
        for(let i = 0; i < s.length; i++){
            let c : string = s[i];
            if(c == '(' || c == '[' || c == '{'){
                myPila.push(c)
            }else{
                if(
                    c == ')' && myPila[myPila.length - 1] != '(' ||
                    c == ']' && myPila[myPila.length - 1] != '[' ||
                    c == '}' && myPila[myPila.length - 1] != '{'     
                ){
                    console.log(myPila[myPila.length - 1])
                    return false;
                }else{
                    myPila.pop();
                }
            }
        }
        console.log(myPila)
        if(myPila.length == 0){
            return true
        }else{
            return false
        }
    }
};
```

