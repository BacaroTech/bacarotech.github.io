+++
title = "Corso C - lezione 14 - confronto tra for, while e do while"
date = 2026-02-25T14:00:56Z
draft = false
featured = false
weight = 100
description = ""
tags = ['c', 'coding', 'corso']
authors = []
series = ["Corso C"]
+++

# CONFRONTO FOR, WHILE E DO WHILE

Nel linguaggio C, i cicli for, while e do while servono tutti a ripetere un blocco di codice, ma si differenziano per struttura e modalità di utilizzo.

## CICLO FOR
Il ciclo for è ideale quando si conosce in anticipo il numero di iterazioni da eseguire, perché racchiude inizializzazione, condizione e aggiornamento in un’unica struttura compatta.

## CICLO WHILE
Il ciclo while è più flessibile ed è utilizzato quando il numero di iterazioni non è noto a priori, ma dipende da una condizione che viene valutata prima di ogni esecuzione del ciclo.

## CICLO DO WHILE
Il ciclo do while, invece, garantisce che il blocco di codice venga eseguito almeno una volta, poiché la condizione viene controllata solo al termine dell’iterazione.

## CONCLUSIONI
In sintesi, la scelta tra questi cicli dipende dal contesto: for per iterazioni controllate, while per condizioni dinamiche e do while quando è necessaria almeno un’esecuzione iniziale.

## CODICE
```c
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

