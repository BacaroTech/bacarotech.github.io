+++
title = "CodingLeetCode - 1 - Two Sum"
date = 2026-02-25T14:00:08Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

Oggi vediamo il seguente esercizio di LeetCode:


> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
>
> You may assume that each input would have exactly one solution, and you may not use the same element twice.
> You can return the answer in any order.

Possiamo risolvere questo problema sfruttando una struttura dati che ci permetta di controllare rapidamente se esiste il complemento di un numero rispetto al target.

L’idea chiave è:

- mentre scorriamo l’array, per ogni numero num
- calcoliamo il suo complemento target - num
- verifichiamo se lo abbiamo già visto
- se sì, abbiamo trovato la coppia 

Questo approccio permette di ottenere una complessità O(n) invece di O(n²).

Detto ciò, la soluzione che proponiamo noi è la seguente:

```typescript
function twoSum(nums: number[], target: number): number[] {
    let mapOfCipher: Map<number, number[]> = new Map<number, number[]>();
    let i = 0;
    nums.forEach((num: number) => {
        if(!mapOfCipher.get(num)){
            mapOfCipher.set(num, [i]);
        }else{
            let arr: number[] = mapOfCipher.get(num);
            arr.push(i)
            mapOfCipher.set(num, arr);
        }
        i++
    });

    let couple: number[] = [];

    nums.forEach((num: number) => {
        let sub = target - num;
        if(couple.length == 0 && mapOfCipher.get(sub)){
            if(sub == num && mapOfCipher.get(sub).length >= 2){
                couple = mapOfCipher.get(sub);
            }else if(sub == num && mapOfCipher.get(sub).length == 1){
                console.log('nop')
            }else{
                couple =  mapOfCipher.get(num).concat(mapOfCipher.get(sub));
            }
        }
    });

    return couple
}
```

Se hai dubbi in merito non esitare a contattarci sui nostri social, saremo più che felici di risponderti :)

