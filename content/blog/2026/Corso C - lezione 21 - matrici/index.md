+++
title = "Corso C - lezione 21 - matrici"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 21 - matrici.c

```c
/*
MATRICI
1. cosa sono
2. regole
3. dichirazione
4. prove d'uso
*/

#include <stdio.h>

int main() {

    int M[3][2] = {
        {1, 2},
        {3, 4},
        {5, 6}
    };

    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
            printf("%d ", M[i][j]);
        }
        printf("\n");
    }

    int somma = 0;
    for(int i = 0; i < 3; i++){
        for(int j = 0; j < 2; j++){
            somma = somma + M[i][j];        
        }
    }

    printf("%d", somma);
    
    return 0;
}
```

