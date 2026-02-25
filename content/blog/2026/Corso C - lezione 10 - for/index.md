+++
title = "Corso C - lezione 10 - for"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 10 - for.c

```c
/*
FOR
cosa sono
perchè servono
sintassi
combinazioni
*/

#include <stdio.h>

int main()
{
    // stessa istruzione ripetuta n volte => n = 3
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");
    printf("ciao\n");

    printf("ESECUZIONE FOR\n");
    int volte;
    scanf("%d", &volte);
    // tramite for
    // inizio, test, incremento/decremento
    // test di persistenza -> se è vero rimaniamo nel for, altrimenti usciamo
    // inizio -> inidice
    int i;
    for (i = 0; i < volte; i++)
    {
        printf("ciao\n");
    }

    /*
    ciclo di un ciclo for
    inizio
    test
        vero -> corpo e incremento
        falso -> si esce dal ciclo
    test
        vero -> corpo e incremento
        falso -> si esce dal ciclo
    ...
    viene fatto finche non ci sarà un test che da falso
    */
}
```

