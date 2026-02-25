+++
title = "Corso C - lezione 19 - array"
date = 2026-02-25T14:01:01Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 19 - array.c

```c
/*
ARRAY
1. cosa sono
2. regole
3. dichirazione
4. prove d'uso
*/

#include <stdio.h>

int main() {
    //dichiarazione
    int A[3] = {1,2,3};
    int B[3];
    int C[] = {1,2,3}; //solo perchè la grandezza dell'array è costante

    /*
    NON SI PUO FARE -> DEVE ESSERE COSTANTE
    int n = 3;
    int D[n] = {1,2,3};
    */

    const int n = 4;
    int D[n] = {1,2,3,4};

    //posizioni ammissibili di un array grande N : [0 - (N-1)]

    //il miglior amico degli array è il for

    //stampa dell'array
    //printf("%d", A);

    //stampa dell'array corretta
    for(int i = 0; i < 3; i++){
        printf("%d ", A[i]);
    }
    printf("\n");
    
    //stampa della somma degli elmenti dell'array
    int somma = 0;
    for(int i = 0; i < 3; i++){
        somma = somma + A[i];
    }
    printf("%d \n", somma);

    //somma di coppie
    int somma2 = 0;
    for(int i = 0; i < 4; i = i + 2){
        somma2 = somma2 + D[i] + D[i+1];
    }
    printf("%d \n", somma2);
    
    return 0;
}
```

