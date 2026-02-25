+++
title = "Corso C - lezione 14 - confronto tra for, while e do while"
date = 2026-02-25T14:00:00Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

## lezione 14 - confronto tra for, while e do while.c

```c
/*
 * CONFRONTO FOR, WHILE E DO WHILE
 */

#include <stdio.h>

int main() {
    /********************** CICLI TUTTI UGUALI **********************/
    for(int i = 0; i < 10; i++){
        printf("%d ", i);
    }
    printf("/n");
    
    int i = 0;//inizializzazione
    while(i < 10){ //condizione
        printf("%d ", i);
        i++; //incremento/decremento
    }
    printf("/n");
    

    int j = 0;//inizializzazione
    do{
        printf("%d ", j); 
        j++; //incremento/decremento
    }while(j < 10); //condizione
    printf("/n");
    

    /********************** COSA PUO FARE SOLO IL WHILE E DO WHILE **********************/
    int letto;
    scanf("%d", &letto);
    while(letto != -1){
        scanf("%d", &letto);
    }

    printf("/n");
    
    do{
        scanf("%d", &letto);
    }while(letto != -1);
    
    
    return 0;
}
```

