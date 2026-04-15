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

# ARRAY

Nel linguaggio C, gli array sono strutture dati che permettono di memorizzare più valori dello stesso tipo in una sequenza ordinata.

## COSA SONO

Un array è una collezione di elementi omogenei, cioè tutti dello stesso tipo, memorizzati in posizioni di memoria contigue. Ogni elemento è accessibile tramite un indice che rappresenta la sua posizione.

## REGOLE

Gli array in C hanno una dimensione fissa definita al momento della dichiarazione e non può essere modificata successivamente. Gli indici partono da zero, quindi il primo elemento si trova sempre in posizione zero. È importante non accedere a posizioni fuori dai limiti, perché può causare errori gravi.

## DICHIARAZIONE

Un array viene dichiarato specificando il tipo degli elementi, il nome e la dimensione. Questo permette al compilatore di allocare una quantità di memoria sufficiente per contenere tutti gli elementi./

## CODICE
```c
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

