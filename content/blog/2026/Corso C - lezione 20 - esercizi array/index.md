+++
title = "Corso C - lezione 20 - esercizi array"
date = 2026-02-25T14:01:02Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 20 - esercizi array.c

```c
/*
ESERCIZI SUGLI ARRAY

es 1: Determinare se un array contiene solo numeri pari

es 2: Scrivere una funzione sub_mult che dato un array di interi v e un intero n, stampi solo i multipli di n

es 3: Scrivere una funzione cumulative_sum che dato un array di interi v, stampi un nuovo array di interi
contenente le somme cumulative per ogni elemento del vettore in input. Ovvero, in ogni posizione i
del nuovo array, dovrà essere la somma di tutti gli elementi in v fino alla posizione i (compresa).
*/

#include <stdio.h>

//es 1: Determinare se un array contiene solo numeri pari
int only_pari(int A[], int dim){
    int prop = 1;
    for(int i = 0; i < dim; i++){
        if(A[i] % 2 != 0){
            prop = 0;
        }
    }
    return prop;
};

//es 2: Scrivere una funzione sub_mult che dato un array di interi v e un intero n, stampi solo i multipli di n
void sub_mult(int A[], int dim, int n){
    for(int i = 0; i < dim; i++){
        if(A[i] % n == 0){
            printf("%d ", A[i]);
        }
    }
}

/*
es 3: Scrivere una funzione cumulative_sum che dato un array di interi v, stampi un nuovo array di interi
contenente le somme cumulative per ogni elemento del vettore in input. Ovvero, in ogni posizione i
del nuovo array, dovrà essere la somma di tutti gli elementi in v fino alla posizione i (compresa).
*/

void cumulative_sum(int A[], int dim){
    for(int i = 0; i < dim; i++){
        int somma = 0;
        for(int j = i; j < dim; j++){
            somma = somma + A[j];
        }
        printf("%d ", somma);
    }
}

int main() {
    const int n = 3;
    int A[n] = {15,5,32};

    printf("es1: %d\n", only_pari(A, n));
    printf("es2:");
    sub_mult(A, n, 5);
    printf("\n");
    printf("es3:");
    cumulative_sum(A, n);
    printf("\n");
    
    return 0;
}
```

