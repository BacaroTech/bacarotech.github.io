+++
title = "Corso C - lezione 12 - while e do while"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 12 - while e do while.c

```c
/*
 * CICLI WHILE
 * cosa sono
 * come si scrivono
 * pericolosità
 * alternativa: ciclo do while
 */


#include <stdio.h>

int main() {
    //inizializzazione, condizione, incremento/decremento
    for(int i = 0; i < 10; i++){
        printf("%d ", i);
    }
    printf("\n");

    /*
    while(condizione){
        ...corpo del ciclo...
    }
    */

    int i = 0; //inizializzazione
    while(i < 10){ //condizione
        printf("%d ", i);
        i++; //incremento/decremento
    }

    printf("\n");
    
    //leggeri numeri finche non leggo il -1
    int letto;
    /*scanf("%d", &letto);
    while(letto != -1){
        scanf("%d", &letto);
    }*/

    //ricostruzione col do while
    do{
        scanf("%d", &letto);
    }while(letto != -1);
    
    return 0;
}
```

