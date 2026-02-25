+++
title = "Corso C - lezione 22 - esercizi matrici"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 22 - esercizi matrici.c

```c
/*
ESERCIZI SULLE MATRICI
es 1: disegno di una scacchiera su una matrice di char

es 2: calcolo della diagonale maggiore

es 3: calcolo della diagonale minore
*/

#include <stdio.h>

//es 1: disegno di una scacchiera su una matrice di char
void disegno(char M[3][3], int r, int c){
    for(int i = 0; i < r; i++){
        for(int j = 0; j < c; j++){
            if(i % 2 == 0 && j % 2 == 0){
                M[i][j] = '+';
            }else{
                M[i][j] = '-';
            }
        }
    }
}

void stampa(char M[3][3], int r, int c){
    for(int i = 0; i < r; i++){
        for(int j = 0; j < c; j++){
            printf("%c ", M[i][j]);
        }
        printf("\n");
    }
}

//es 2: calcolo della diagonale maggiore
int somma_DM(int M[3][3], int r, int c){
    int somma = 0;
    for(int i = 0; i < r; i++){
        somma = somma + M[i][i];
    }
    return somma;
}

//es 3: calcolo della diagonale minore
int somma_dm(int M[3][3], int r, int c){
    int somma = 0;
    for(int i = 0; i < r; i++){
        somma = somma + M[i][c-i-1];
    }
    return somma;
}

int main() {
    int M[3][3] = {
        {1, 2, 13},
        {4, 15, 6},
        {7, 8, 9}
    };

    char scac[3][3];
    disegno(scac, 3, 3);
    stampa(scac, 3, 3);
    printf("es2: %d\n", somma_DM(M, 3, 3));
    printf("es3: %d", somma_dm(M, 3, 3));
    
    return 0;
}
```

