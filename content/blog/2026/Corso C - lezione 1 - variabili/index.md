+++
title = "Corso C - lezione 1 - variabili"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 1 - variabili.c

```c
/*
VARIABILI
cosa sono
come crarne una
come modificarla
come stamparla
come modificarla tramite il terminale
*/

#include <stdio.h>

int main()
{
    // tipo nome = valore
    int variabile = 5; // inizializzazione

    // tipo nome
    int varibile2; // creazione

    // i nomi delle varibili sono esclusivi
    // le varibili non posso iniziare con un numero
    // int 2varibile => errore

    varibile2 = 4; // assegnamento
    // il tipo viene messo solo in fare di dichiarazione di una varibile

    //%d viene usato solo per gli int
    printf("valore delle varibili: %d %d\n", variabile, varibile2);

    //%d viene usato solo per gli int
    // scanf("testo: %d", &variabile); -> NON POSSO INSERIRE TESTO NELLA SCANF

    printf("inserisci valore della varibile:");
    scanf("%d", &variabile);

    printf("valore delle varibili: %d %d\n", variabile, varibile2);
}
```

