+++
title = "Corso C - lezione 3 - esercizi variabili"
date = 2026-02-25T14:00:45Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 3 - esercizi variabili.c

```c
/*
ESERCIZI SUI TIPI
es1
Dichiarare due variabili intere, assegnare loro un valore e stampare la loro somma.

es2
Usare variabili float per calcolare area e perimetro di un rettangolo.

es3
Scambiare i valori di due variabili intere utilizzando una variabile temporanea.

*/

#include <stdio.h>
#include <stdbool.h> // Per il tipo bool

int main()
{
    // commento di singola riga
    /*
    commento su più righe
    */

    /*
    es1
    Dichiarare due variabili intere, assegnare loro un valore e stampare la loro somma.
    */
    int A = 5;
    int B = 4;
    int somma = A + B;
    printf("la somma è: %d", somma);

    /*
    es2
    Usare variabili float per calcolare area e perimetro di un rettangolo.
    */
    float B;
    float H;

    printf("inserisci base: ");
    scanf("%f", &B);
    printf("inserisci altezza: ");
    scanf("%f", &H);

    float P = B * 2 + H * 2;
    float A = B * H;

    printf("P: %f", P);
    printf("A: %f", A);

    /*
    es3
    Scambiare i valori di due variabili intere utilizzando una variabile temporanea.
    */
    int v1 = 1;
    int v2 = 2;
    int backup;
    printf("prima: %d %d\n", v1, v2);
    backup = v1;
    v1 = v2;
    v2 = backup;
    printf("dopo: %d %d\n", v1, v2);

    return 0;
}

```

