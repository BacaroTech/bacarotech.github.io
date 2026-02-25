+++
title = "Corso C - lezione 17 - puntatori"
date = 2026-02-25T14:00:59Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 17 - puntatori.c

```c
/* 
* PUNTATORI
* cosa sono
* come si scrivono
* operazioni permesse sui puntatori
* come mai sono pericolosi
* come mai sono difficili(e come capirli)
*/

    
#include <stdio.h>

int main() {
    int n = 3;

    // tipo * -> puntatore di tipo
    // int * pn = n -> non va bene perchè stiamo mettendo un intero all'interno di un puntatore a intero(miss match di tipi);
    // &n estrae l'indirizzo di n ed è ideale per i puntatori
    int * pn = &n;

    // estrarre il valore del puntatore
    int risolta = *pn;
    printf("%d %d\n", n, risolta);

    *pn = 4;
    printf("%d %d\n", n, *pn);

    // operazioni
    int m = 2;
    int * pm = &m;

    // assegnamento tra puntatori
    // pn = pm; -> non servono altri siboli!!!
    // pm + 5; -> lo spostamento del puntatore di n posizioni(5)
    // pm - pn; -> numero di celle tra puntatore1 e punatore2

    return 0;
}
```

