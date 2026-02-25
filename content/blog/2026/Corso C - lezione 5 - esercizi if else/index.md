+++
title = "Corso C - lezione 5 - esercizi if else"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 5 - esercizi if else.c

```c
/*
es 1
Utilizzare una struttura if per determinare se un numero è positivo, negativo o zero.

es 2
Confrontare due numeri interi e stampare il maggiore.

es 3
Controllare se un voto è valido (0–30) e determinare se è sufficiente (≥18).
*/

#include <stdio.h>

int main()
{
    /*
    es 1
    Utilizzare una struttura if per determinare se un numero è positivo, negativo o zero.
    */

    // v1
    /*int val = -1;
    if(val > 0){
        printf("positivo");
    }else{
        if(val < 0){
            printf("negativo");
        }else{
            printf("zero");
        }
    }*/

    // v2
    int val = 0;
    if (val > 0)
    {
        printf("positivo");
    }
    else if (val < 0)
    {
        printf("negativo");
    }
    else
    {
        printf("zero");
    }

    /*
    es 2
    Confrontare due numeri interi e stampare il maggiore.
    */
    int v1 = 12;
    int v2 = 6;
    if (v1 > v2)
    {
        printf("max: %d", v1);
    }
    else
    {
        printf("max: %d", v2);
    }

    /*
    es 3
    Controllare se un voto è valido (0–30) e determinare se è sufficiente (≥18).
    */
    int voto = 18;
    // 0 <= 60 <= 30 -> no
    // 0 <= 60 <= 30 -> 0 <= 60 e 60 <= 30
    if (0 <= voto && voto <= 30)
    {
        printf("valido\n");
        if (voto >= 18)
        {
            printf("sufficiente\n");
        }
        else
        {
            printf("insufficiente\n");
        }
    }
    else
    {
        printf("non valido\n");
    }

    return 0;
}

```

