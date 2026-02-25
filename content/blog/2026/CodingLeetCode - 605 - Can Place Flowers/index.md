+++
title = "CodingLeetCode - 605 - Can Place Flowers"
date = 2026-02-25T14:00:33Z
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
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    let count: number = 0;
    let possibleExPosition: boolean = false;
    if(flowerbed.length == 1 && flowerbed[0] == 0 && n == 1){
        return true;
    }
    for(let i:number=0; i< flowerbed.length; i++){
        if(flowerbed[i] == 0){
            if(i-1 >= 0 && flowerbed[i-1] == 0){
                if(i+1 < flowerbed.length && flowerbed[i+1] == 0){
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                }
            }

            if(i == 0){
                if(i+1 < flowerbed.length && flowerbed[i+1] == 0){
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                    
                }
            }

            if(i == flowerbed.length-1){
                if(i-1 >= 0 && flowerbed[i-1] == 0){
                    console.log("here")
                    if(possibleExPosition == true){
                        possibleExPosition = false;
                    }else{
                        count++;
                        possibleExPosition = true;
                    }
                }
            }
        }else{
            possibleExPosition = false;
        }
    }
    console.log( count, n);
    return count >= n;
};
```

