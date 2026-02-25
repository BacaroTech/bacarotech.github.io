+++
title = "Corso C - lezione 11 - esercizi for"
date = 2026-02-25T14:00:53Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 11 - esercizi for.c

```c
/*
ESERCIZI FOR
*/

#include <stdio.h>

int main() {
    /*
    ES 1
    Scrivi un programma che stampi i numeri da 10 a 1 in ordine decrescente utilizzando un ciclo for.
    */
    int start = 10;
    int end = 1;
    int i;
    for(i = start; i >= end; i--){
        printf("%d ", i);
    }
    
    /*
    ES 2
    Calcola la somma di tutti i numeri pari da 1 a 100 usando un ciclo for.
    */
    int somma = 0;
    int start = 1;
    int end = 100;
    int i;
    for(i = start; i <= end; i++){
        //all'interno di somma ci metto il vecchio valore + l'elemento di ciclo(dipende dallo step)
        somma = somma + i;
    }
    printf("%d", somma);
    
    /*
    ES 3
    Chiedi all’utente un numero n e stampa la sua tabellina fino a n × 10.
    */
    int valore;
    printf("inserisci valore del quale si vuole calcolare la tabellina\n");
    scanf("%d", &valore);
    int i;
    for(i = 1; i <= 10; i++){
        printf("%d x %d = %d\n", i, valore, i * valore);
    }
}
```

