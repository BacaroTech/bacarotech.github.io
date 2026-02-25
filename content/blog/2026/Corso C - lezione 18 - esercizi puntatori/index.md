+++
title = "Corso C - lezione 18 - esercizi puntatori"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 18 - esercizi puntatori.c

```c
/*
 * ESERCIZI SUI PUNTATORI
 */

#include <stdio.h>

/*
Esercizio 1 – Scambio di valori con puntatori
Scrivi un programma in C che dichiari due variabili intere. 
Implementa una funzione swap che prende in input due puntatori a intero e scambia i valori delle due variabili.
*/
void swapPointer(int * pa, int * pb){
    int auxScambio = *pb;
    *pb = *pa;
    *pa = auxScambio;
}

/*
Esercizio 2 – Puntatore a funzione
Scrivi un programma che dichiari una funzione int quadrato(int x) che restituisce il quadrato di un numero.
Nel main, dichiara un puntatore a funzione e usalo per chiamare la funzione quadrato.
*/
int quadrato(int x){
    return x*x;
}

int main() {
    int a = 4;
    int b = 3;
    printf("%d %d\n", a, b);
    swapPointer(&a, &b);
    printf("%d %d\n", a, b);

    int (*PQuadrato)(int); //funzione che prende un intero e ritorna un intero
    PQuadrato = &quadrato; //ottenuto l'indirizzo della funzione
    int res = PQuadrato(4); //utilizata la funzione tramite il suo puntatore
    printf("valore quadrato: %d", res);

    /*
    Esercizio 3 – Puntatore a puntatore
    Scrivi un programma che dichiari una variabile intera, un puntatore a intero e un puntatore a puntatore.
    Assegna alla variabile un valore.
    Fai in modo che il puntatore punti a quella variabile.
    Fai in modo che il puntatore a puntatore punti al puntatore.
    Stampa il valore della variabile utilizzando sia il puntatore che il puntatore a puntatore.
    */
    int n = 3;
    int * pn = &n;
    int ** dpn = &pn;

    printf("%d %d %d", n, *pn, **dpn);
    
    return 0;
}
```

